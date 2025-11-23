import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Use a writable location for serverless (e.g., Vercel) where the repo dir is read-only.
// Allow override via env for local dev or future persistence options.
const dbPath =
  process.env.DB_PATH || path.join("/tmp", "mcp-test-app", "app.db");

function ensureDatabase() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getDbInstance() {
  ensureDatabase();
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

export function getDb() {
  return getDbInstance();
}
