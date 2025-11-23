import { NextResponse } from "next/server";
import { createUser, ensureDefaultUser } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    ensureDefaultUser();
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const db = getDb();
    const existing = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = createUser(username, password);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
