import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const safeName = escapeHtml(name || "Nao informado");
  const safeEmail = escapeHtml(email || "Nao informado");
  const safeSubject = escapeHtml(subject || "Contato pelo site");
  const safeMessage = escapeHtml(message || "");

  return `
    <div style="font-family:Arial,sans-serif; background:#0b1120; color:#e2e8f0; padding:32px;">
      <div style="max-width:640px; margin:0 auto; background:#0f172a; border-radius:16px; padding:24px; border:1px solid #1e293b;">
        <h1 style="margin:0 0 16px; font-size:22px; color:#38bdf8;">Contato via site mscodify</h1>
        <p style="margin:0 0 12px; color:#94a3b8;">Uma nova mensagem foi enviada pelo formulario do site.</p>
        <div style="margin:16px 0; padding:16px; background:#111827; border-radius:12px; border:1px solid #1f2937;">
          <p style="margin:0 0 8px;"><strong>Nome:</strong> ${safeName}</p>
          <p style="margin:0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin:0;"><strong>Assunto:</strong> ${safeSubject}</p>
        </div>
        <div style="padding:16px; background:#0b1120; border-radius:12px; border:1px solid #1f2937;">
          <p style="margin:0; white-space:pre-line;">${safeMessage}</p>
        </div>
      </div>
    </div>
  `;
}

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { success: false, error: "Turnstile secret nao configurado." };
  }
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }
  );
  const data = (await response.json()) as { success: boolean };
  return data;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      turnstileToken?: string;
    };

    if (!body?.turnstileToken) {
      return NextResponse.json(
        { error: "Validacao anti-bot obrigatoria." },
        { status: 400 }
      );
    }

    const turnstile = await verifyTurnstile(body.turnstileToken);
    if (!turnstile.success) {
      return NextResponse.json(
        { error: "Falha na validacao do Turnstile." },
        { status: 400 }
      );
    }

    const to = process.env.RESEND_TO || "suporte@mscodify.dev.br";
    const from = process.env.RESEND_FROM || "mscodify <no-reply@mscodify.dev.br>";
    const subject = body.subject?.trim() || "Contato pelo site";

    await resend.emails.send({
      from,
      to,
      replyTo: body.email || undefined,
      subject,
      html: renderEmail({
        name: body.name || "",
        email: body.email || "",
        subject,
        message: body.message || "",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao enviar.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
