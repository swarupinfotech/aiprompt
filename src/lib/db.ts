import { createClient, type Row } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { categories as seedCategories, promptCatalog } from "@/lib/data";

const localDbPath = path.join(process.cwd(), "data", "app.db");
const localDbUrl = pathToFileURL(localDbPath).href;
const databaseUrl = process.env.TURSO_DATABASE_URL || localDbUrl;
const databaseToken = process.env.TURSO_AUTH_TOKEN;

if (!process.env.TURSO_DATABASE_URL && process.env.NODE_ENV !== "production") {
  mkdirSync(path.dirname(localDbPath), { recursive: true });
}

if (process.env.TURSO_DATABASE_URL && !databaseToken) {
  throw new Error("TURSO_AUTH_TOKEN is required when TURSO_DATABASE_URL is set.");
}

const db = createClient({
  url: databaseUrl,
  ...(databaseToken ? { authToken: databaseToken } : {}),
});

function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

function verifyPassword(password: string, storedPassword: string) {
  const [scheme, saltValue, hashValue] = storedPassword.split("$");
  if (scheme !== "scrypt" || !saltValue || !hashValue) return false;

  const salt = Buffer.from(saltValue, "base64url");
  const expected = Buffer.from(hashValue, "base64url");
  if (expected.length !== 64) return false;

  const actual = scryptSync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

function stringValue(row: Row, column: string) {
  const value = row[column];
  return value == null ? "" : String(value);
}

function numberValue(row: Row, column: string) {
  return Number(row[column] ?? 0);
}

async function initializeDatabase() {
  if (process.env.NODE_ENV === "production" && (!process.env.TURSO_DATABASE_URL || !databaseToken)) {
    throw new Error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for the production database.");
  }

  await db.batch([
    `CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'admin',
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      slug TEXT UNIQUE,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS prompts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT,
      description TEXT,
      category TEXT,
      subcategory TEXT,
      tags TEXT,
      compatible_tools TEXT,
      difficulty TEXT,
      prompt_content TEXT,
      customizable_vars TEXT,
      instructions TEXT,
      example_input TEXT,
      example_output TEXT,
      tips TEXT,
      image_url TEXT,
      image_alt TEXT,
      seo_title TEXT,
      meta_description TEXT,
      copy_count INTEGER DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at TEXT,
      updated_at TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`,
  ], "write");

  const adminEmail = process.env.ADMIN_EMAIL || (process.env.NODE_ENV === "production" ? "" : "admin@promptlibrary.com");
  const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "admin123");
  if (!adminEmail || !adminPassword) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before initializing the admin account.");
  }

  await db.execute({
    sql: "INSERT OR IGNORE INTO admin_users (email, password, role, name) VALUES (?, ?, 'admin', 'Administrator')",
    args: [adminEmail, hashPassword(adminPassword)],
  });

  const categoryResult = await db.execute("SELECT COUNT(*) AS total FROM categories");
  if (numberValue(categoryResult.rows[0], "total") < seedCategories.length) {
    await db.batch(seedCategories.map((category) => {
      const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      return {
        sql: "INSERT OR IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)",
        args: [category, slug, `Curated prompts for ${category.toLowerCase()} workflows.`],
      };
    }), "write");
  }

  const promptResult = await db.execute("SELECT COUNT(*) AS total FROM prompts");
  if (numberValue(promptResult.rows[0], "total") < promptCatalog.length) {
    const insertStatements = promptCatalog.map((prompt) => ({
      sql: `INSERT OR IGNORE INTO prompts (
        id, slug, title, description, category, subcategory, tags, compatible_tools,
        difficulty, prompt_content, customizable_vars, instructions, example_input,
        example_output, tips, image_url, image_alt, seo_title, meta_description,
        copy_count, view_count, published, created_at, updated_at
      ) VALUES (${new Array(24).fill("?").join(", ")})`,
      args: [
        prompt.id,
        prompt.slug,
        prompt.title,
        prompt.description,
        prompt.category,
        prompt.subcategory,
        JSON.stringify(prompt.tags),
        JSON.stringify(prompt.compatibleTools),
        prompt.difficulty,
        prompt.promptContent,
        JSON.stringify(prompt.customizableVars),
        prompt.instructions,
        prompt.exampleInput,
        prompt.exampleOutput,
        prompt.tips,
        prompt.imageUrl,
        prompt.imageAlt,
        prompt.seoTitle,
        prompt.metaDescription,
        prompt.copyCount,
        prompt.viewCount,
        prompt.published ? 1 : 0,
        prompt.createdAt,
        prompt.updatedAt,
      ],
    }));

    for (let index = 0; index < insertStatements.length; index += 100) {
      await db.batch(insertStatements.slice(index, index + 100), "write");
    }
  }
}

let databaseReady: Promise<void> | undefined;

function ensureDatabaseReady() {
  if (!databaseReady) {
    databaseReady = initializeDatabase();
  }
  return databaseReady;
}

export async function verifyAdminCredentials(email: string, password: string) {
  await ensureDatabaseReady();
  const result = await db.execute({
    sql: "SELECT password, role FROM admin_users WHERE email = ?",
    args: [email],
  });
  const user = result.rows[0];
  if (!user || stringValue(user, "role") !== "admin") return false;

  const storedPassword = stringValue(user, "password");
  if (verifyPassword(password, storedPassword)) return true;

  if (storedPassword === password) {
    await db.execute({
      sql: "UPDATE admin_users SET password = ? WHERE email = ?",
      args: [hashPassword(password), email],
    });
    return true;
  }

  return false;
}

export async function listPrompts(limit = 20) {
  await ensureDatabaseReady();
  const result = await db.execute({
    sql: "SELECT * FROM prompts ORDER BY created_at DESC LIMIT ?",
    args: [limit],
  });

  return result.rows.map((row) => ({
    id: stringValue(row, "id"),
    slug: stringValue(row, "slug"),
    title: stringValue(row, "title"),
    description: stringValue(row, "description"),
    category: stringValue(row, "category"),
    subcategory: stringValue(row, "subcategory"),
    tags: JSON.parse(stringValue(row, "tags") || "[]"),
    compatibleTools: JSON.parse(stringValue(row, "compatible_tools") || "[]"),
    difficulty: stringValue(row, "difficulty"),
    prompt_content: stringValue(row, "prompt_content"),
    customizableVars: JSON.parse(stringValue(row, "customizable_vars") || "[]"),
    instructions: stringValue(row, "instructions"),
    example_input: stringValue(row, "example_input"),
    example_output: stringValue(row, "example_output"),
    tips: stringValue(row, "tips"),
    image_url: stringValue(row, "image_url"),
    image_alt: stringValue(row, "image_alt"),
    seo_title: stringValue(row, "seo_title"),
    meta_description: stringValue(row, "meta_description"),
    published: numberValue(row, "published") === 1,
    copy_count: numberValue(row, "copy_count"),
    view_count: numberValue(row, "view_count"),
  }));
}

export async function getPromptStats() {
  await ensureDatabaseReady();
  const [prompts, categories, contacts, views] = await Promise.all([
    db.execute("SELECT COUNT(*) AS total FROM prompts"),
    db.execute("SELECT COUNT(*) AS total FROM categories"),
    db.execute("SELECT COUNT(*) AS total FROM contact_messages"),
    db.execute("SELECT COALESCE(SUM(view_count), 0) AS total FROM prompts"),
  ]);

  return {
    promptCount: numberValue(prompts.rows[0], "total"),
    categoryCount: numberValue(categories.rows[0], "total"),
    contactCount: numberValue(contacts.rows[0], "total"),
    totalViews: numberValue(views.rows[0], "total"),
  };
}

export async function createContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  await ensureDatabaseReady();
  await db.execute({
    sql: "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
    args: [data.name, data.email, data.subject, data.message],
  });
}

export async function getRecentPrompts(limit = 6) {
  await ensureDatabaseReady();
  const result = await db.execute({
    sql: "SELECT id, title, category, published FROM prompts ORDER BY created_at DESC LIMIT ?",
    args: [limit],
  });

  return result.rows.map((row) => ({
    id: stringValue(row, "id"),
    title: stringValue(row, "title"),
    category: { name: stringValue(row, "category") },
    published: numberValue(row, "published") === 1,
  }));
}
