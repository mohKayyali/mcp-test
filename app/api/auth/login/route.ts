import { NextResponse } from "next/server";
import { ensureDefaultUser, verifyUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    ensureDefaultUser();
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const user = verifyUser(username, password);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
