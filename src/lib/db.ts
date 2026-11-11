import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { categories as seedCategories, promptCatalog } from "@/lib/data";

const dbPath = path.join(process.cwd(), "data", "app.db");
mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

type PromptRecordRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string;
  compatible_tools: string;
  difficulty: string;
  prompt_content: string;
  customizable_vars: string;
  instructions: string;
  example_input: string;
  example_output: string;
  tips: string;
  image_url: string;
  image_alt: string;
  seo_title: string;
  meta_description: string;
  copy_count: number;
  view_count: number;
  published: number;
  created_at: string;
  updated_at: string;
};

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'admin',
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      slug TEXT UNIQUE,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS prompts (
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
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      message TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@promptlibrary.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminExists = db.prepare("SELECT 1 FROM admin_users WHERE email = ?").get(adminEmail);
  if (!adminExists) {
    db.prepare("INSERT INTO admin_users (email, password, role, name) VALUES (?, ?, 'admin', 'Administrator')").run(adminEmail, adminPassword);
  }

  const categoryResult = db.prepare("SELECT COUNT(*) AS total FROM categories").get() as { total?: number } | undefined;
  const categoryCount = Number(categoryResult?.total ?? 0);
  if (categoryCount === 0) {
    for (const category of seedCategories) {
      const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      db.prepare("INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)").run(category, slug, `Curated prompts for ${category.toLowerCase()} workflows.`);
    }
  }

  const promptResult = db.prepare("SELECT COUNT(*) AS total FROM prompts").get() as { total?: number } | undefined;
  const promptCount = Number(promptResult?.total ?? 0);
  if (promptCount === 0) {
    const insertPrompt = db.prepare(`
      INSERT INTO prompts (
        id, slug, title, description, category, subcategory, tags, compatible_tools,
        difficulty, prompt_content, customizable_vars, instructions, example_input,
        example_output, tips, image_url, image_alt, seo_title, meta_description,
        copy_count, view_count, published, created_at, updated_at
      ) VALUES (
        @id, @slug, @title, @description, @category, @subcategory, @tags, @compatibleTools,
        @difficulty, @promptContent, @customizableVars, @instructions, @exampleInput,
        @exampleOutput, @tips, @imageUrl, @imageAlt, @seoTitle, @metaDescription,
        @copyCount, @viewCount, @published, @createdAt, @updatedAt
      )
    `);

    for (const prompt of promptCatalog) {
      insertPrompt.run({
        id: prompt.id,
        slug: prompt.slug,
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        subcategory: prompt.subcategory,
        tags: JSON.stringify(prompt.tags),
        compatibleTools: JSON.stringify(prompt.compatibleTools),
        difficulty: prompt.difficulty,
        promptContent: prompt.promptContent,
        customizableVars: JSON.stringify(prompt.customizableVars),
        instructions: prompt.instructions,
        exampleInput: prompt.exampleInput,
        exampleOutput: prompt.exampleOutput,
        tips: prompt.tips,
        imageUrl: prompt.imageUrl,
        imageAlt: prompt.imageAlt,
        seoTitle: prompt.seoTitle,
        metaDescription: prompt.metaDescription,
        copyCount: prompt.copyCount,
        viewCount: prompt.viewCount,
        published: prompt.published ? 1 : 0,
        createdAt: prompt.createdAt,
        updatedAt: prompt.updatedAt,
      });
    }
  }
}

initializeDatabase();

export function getAdminUser(email: string) {
  return db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email) as { email: string; password: string; role: string; name: string } | undefined;
}

export function listPrompts(limit = 20) {
  const rows = db.prepare("SELECT * FROM prompts ORDER BY created_at DESC LIMIT ?").all(limit) as PromptRecordRow[];
  return rows.map((row) => ({
    ...row,
    tags: JSON.parse(String(row.tags ?? "[]")),
    compatibleTools: JSON.parse(String(row.compatible_tools ?? "[]")),
    customizableVars: JSON.parse(String(row.customizable_vars ?? "[]")),
    published: Number(row.published ?? 0) === 1,
    category: row.category,
    copy_count: row.copy_count,
    view_count: row.view_count,
  }));
}

export function getPromptStats() {
  const promptResult = db.prepare("SELECT COUNT(*) AS total FROM prompts").get() as { total?: number } | undefined;
  const categoryResult = db.prepare("SELECT COUNT(*) AS total FROM categories").get() as { total?: number } | undefined;
  const contactResult = db.prepare("SELECT COUNT(*) AS total FROM contact_messages").get() as { total?: number } | undefined;
  const viewsResult = db.prepare("SELECT COALESCE(SUM(view_count), 0) AS total FROM prompts").get() as { total?: number } | undefined;

  const promptCount = Number(promptResult?.total ?? 0);
  const categoryCount = Number(categoryResult?.total ?? 0);
  const contactCount = Number(contactResult?.total ?? 0);
  const totalViews = Number(viewsResult?.total ?? 0);
  return { promptCount, categoryCount, contactCount, totalViews };
}

export function createContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  db.prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)").run(data.name, data.email, data.subject, data.message);
}

export function getRecentPrompts(limit = 6) {
  const rows = db.prepare("SELECT * FROM prompts ORDER BY created_at DESC LIMIT ?").all(limit) as PromptRecordRow[];
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: { name: row.category },
    published: Number(row.published ?? 0) === 1,
  }));
}
