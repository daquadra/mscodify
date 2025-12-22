"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
    };
  }
}

export default function Contact() {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const renderTurnstile = () => {
    if (typeof window === "undefined") return;
    const turnstile = window.turnstile;
    if (!turnstile || !widgetRef.current || widgetIdRef.current) return;

    widgetIdRef.current = turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: (token: string) => {
        setTurnstileToken(token);
        setTurnstileError("");
      },
      "error-callback": () => {
        setTurnstileError("Nao foi possivel validar o Turnstile.");
      },
      "expired-callback": () => {
        setTurnstileToken("");
      },
    });
  };

  useEffect(() => {
    renderTurnstile();
  }, [siteKey]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!siteKey) {
      setTurnstileError("Chave do Turnstile nao configurada.");
      return;
    }
    if (!turnstileToken) {
      setTurnstileError("Confirme o desafio anti-bot antes de enviar.");
      return;
    }
    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const subject = String(formData.get("subject") || "");
    const message = String(formData.get("message") || "");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || "Falha ao enviar. Tente novamente.");
      }

      setSubmitSuccess("Mensagem enviada com sucesso. Em breve retorno.");
      form.reset();
      setTurnstileToken("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Falha ao enviar.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Vamos construir algo <br />
              <span className="text-primary">incrível juntos?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Tem um projeto em mente? Entre em contato para discutirmos como posso ajudar a tirar sua ideia do papel.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <a href="mailto:suporte@mscodify.dev.br" className="text-muted-foreground hover:text-primary transition-colors">
                    suporte@mscodify.dev.br
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">WhatsApp</h4>
                  <a
                    href="https://wa.me/5569984432406?text=Ol%C3%A1%2C%20vim%20pelo%20site%20mscodify%20e%20gostaria%20de%20falar%20sobre%20um%20projeto."
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +55 (69) 98443-2406
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-card/50 border-white/5 backdrop-blur-sm w-full">
            <CardContent className="p-3">
              <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit} suppressHydrationWarning>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input
                      name="name"
                      placeholder="Seu nome"
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <Input
                    name="subject"
                    placeholder="Sobre o projeto..."
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea
                    name="message"
                    placeholder="Me conte mais sobre sua ideia..."
                    className="min-h-[100px] sm:min-h-[120px] bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <div ref={widgetRef} suppressHydrationWarning />
                  </div>
                  {turnstileError ? (
                    <p className="text-sm text-destructive">{turnstileError}</p>
                  ) : null}
                </div>
                {submitError ? (
                  <p className="text-sm text-destructive">{submitError}</p>
                ) : null}
                {submitSuccess ? (
                  <p className="text-sm text-emerald-400">{submitSuccess}</p>
                ) : null}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold h-12"
                  disabled={!turnstileToken || isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
