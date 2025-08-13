import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
