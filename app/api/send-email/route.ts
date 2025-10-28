// app/api/send-email/route.ts
// TODO: Implement this API route with your email service provider (e.g., using Resend, SendGrid, etc.)
// Example with Resend (install @resend/resend and set RESEND_API_KEY in .env)

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, subject, body, replyTo } = await request.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text: body,
      replyTo
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}