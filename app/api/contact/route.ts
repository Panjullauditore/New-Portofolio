import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL;

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured in .env.local");
      return NextResponse.json(
        {
          error:
            "Layanan email belum dikonfigurasi. Harap tambahkan RESEND_API_KEY di file .env.local",
        },
        { status: 503 }
      );
    }

    if (!recipientEmail) {
      return NextResponse.json(
        {
          error:
            "Email penerima belum dikonfigurasi. Harap tambahkan CONTACT_EMAIL di file .env.local",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: "Portofolio Website <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `💬 Pesan Baru dari Portofolio: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFF8E7; margin: 0; padding: 24px; color: #1A1A2E; }
            .card { background-color: #FFFFFF; border: 3px solid #1A1A2E; box-shadow: 6px 6px 0px #1A1A2E; max-width: 560px; margin: 0 auto; overflow: hidden; }
            .header { background-color: #FFE925; border-bottom: 3px solid #1A1A2E; padding: 20px; text-align: center; }
            .badge { display: inline-block; background-color: #1A1A2E; color: #FFE925; padding: 4px 10px; font-weight: bold; font-size: 12px; margin-bottom: 8px; }
            .content { padding: 24px; }
            .field { margin-bottom: 16px; }
            .label { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #555; margin-bottom: 4px; }
            .value { font-size: 16px; font-weight: 600; }
            .message-box { background-color: #FFF8E7; border: 2px solid #1A1A2E; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
            .footer { border-top: 2px solid #1A1A2E; padding: 16px; text-align: center; font-size: 12px; color: #777; background-color: #FAFAF9; }
            .btn { display: inline-block; background-color: #FFE925; color: #1A1A2E; border: 2px solid #1A1A2E; box-shadow: 2px 2px 0px #1A1A2E; padding: 10px 20px; font-weight: bold; text-decoration: none; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <span class="badge">PESAN BARU</span>
              <h2 style="margin: 0; font-size: 22px;">Inquiry Kerja Sama Portofolio</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Dari Pengirim:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Alamat Email:</div>
                <div class="value"><a href="mailto:${email}" style="color: #4D96FF;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Isi Pesan:</div>
                <div class="message-box">${message}</div>
              </div>
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re: Portofolio Inquiry" class="btn">Balas Langsung (${email})</a>
              </div>
            </div>
            <div class="footer">
              Email ini dikirim otomatis dari form kontak website portofolio Anda.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json(
        { error: data.error.message || "Gagal mengirim email via Resend" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil dikirim!",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat mengirim pesan." },
      { status: 500 }
    );
  }
}
