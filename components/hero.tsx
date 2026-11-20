import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { container } from "@/components/layout";

export default function Hero() {
  return (
    <section className={`${container} pb-[clamp(64px,8vw,112px)] pt-[clamp(64px,9vw,128px)]`}>
      <p className="mb-6 text-sm font-medium text-muted-foreground">
        Desenvolvimento de software
      </p>
      <h1 className="max-w-[900px] text-[clamp(38px,5.6vw,72px)] font-semibold leading-[1.03] tracking-[-0.03em] text-balance">
        Software sob medida para o seu negócio.
      </h1>
      <p className="mt-7 max-w-[600px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-muted-foreground">
        Criamos sistemas web, automações e ferramentas internas, da primeira
        conversa até o sistema funcionando. Conte o que você precisa e
        respondemos com uma proposta.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-13 items-center gap-2 rounded-md bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover hover:text-white motion-reduce:transition-none"
        >
          Conversar no WhatsApp
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
          <span className="sr-only">(abre em nova aba)</span>
        </a>
        <a
          href={`mailto:${site.contactEmail}`}
          className="inline-flex min-h-13 items-center rounded-md border border-control px-6 text-base font-semibold transition-colors hover:border-foreground motion-reduce:transition-none"
        >
          Enviar e-mail
        </a>
      </div>
    </section>
  );
}
