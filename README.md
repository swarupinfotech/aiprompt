# AI Prompt Library

AI Prompt Library is a Next.js app with a prompt catalog, admin login, and contact form.

## Local development

```bash
npm install
npm run dev
```

Without Turso variables, development uses a local SQLite database at `data/app.db` and seeds the catalog automatically. Local default admin login: `admin@promptlibrary.com` / `admin123`.

## Production environment

Configure these environment variables in Vercel:

- `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`: credentials for a persistent Turso database.
- `AUTH_SECRET`: a private random secret used to sign admin sessions.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: initial admin account credentials.

The first request initializes the database and seeds the catalog. Set production credentials before deploying; the local admin defaults are disabled in production.

Deploy the GitHub repository `swarupinfotech/aiprompt` from the Vercel dashboard or with the Vercel CLI.
