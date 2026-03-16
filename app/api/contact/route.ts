import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, tel, message } = await req.json();

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          name,
          email,
          tel,
          message,
        },
      }),
    });

    const text = await res.text();
    console.log("EmailJS:", text);

    if (!res.ok) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}