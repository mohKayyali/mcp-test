import crypto from "crypto";
import { getDb } from "./db";

const SALT_LEN = 16;
const KEY_LEN = 64;
const COST = 16384;
const BLOCK_SIZE = 8;
const PARALLEL = 1;

function hashPassword(password: string) {
  const salt = crypto.randomBytes(SALT_LEN);
  const derived = crypto.scryptSync(password, salt, KEY_LEN, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLEL,
  });
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [saltHex, hashHex] = storedHash.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const derived = crypto.scryptSync(password, salt, KEY_LEN, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLEL,
  });
  return crypto.timingSafeEqual(Buffer.from(hashHex, "hex"), derived);
}

export function ensureDefaultUser() {
  const db = getDb();
  const count = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (count.count === 0) {
    const hash = hashPassword("123");
    db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)").run("admin", hash);
  }
}

export function createUser(username: string, password: string) {
  const db = getDb();
  const hash = hashPassword(password);
  const stmt = db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
  const result = stmt.run(username, hash);
  return { id: result.lastInsertRowid, username };
}

export function verifyUser(username: string, password: string) {
  const db = getDb();
  const user = db
    .prepare("SELECT id, username, password_hash FROM users WHERE username = ?")
    .get(username) as { id: number; username: string; password_hash: string } | undefined;
  if (!user) return null;
  const valid = verifyPassword(password, user.password_hash);
  if (!valid) return null;
  return { id: user.id, username: user.username };
}
