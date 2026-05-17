import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !adminPasswordHash) {
      return NextResponse.json(
        { error: "Admin env belum diset" },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    if (email !== adminEmail) {
      return NextResponse.json({ error: "Email salah" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, adminPasswordHash);
    if (!valid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
