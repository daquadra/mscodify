import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { container } from "@/components/layout";
import TechBackground from "@/components/tech-background";

export default function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="on-dark relative isolate overflow-hidden bg-ink text-white"
    >
      <TechBackground
        variant="dark"
        maskClassName="[mask-image:linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65))] md:[mask-image:linear-gradient(90deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.4)_40%,#000_75%)]"
      />
      <div
        className={`${container} flex flex-wrap items-end gap-x-20 gap-y-12 py-[clamp(72px,9vw,120px)]`}
      >
        <div className="min-w-0 flex-[999_1_520px]">
          <p className="mb-3 text-sm font-medium text-ink-muted">Contato</p>
          <h2
            id="contato-titulo"
            className="max-w-[680px] text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.025em] text-balance"
          >
            Vamos conversar sobre o seu projeto?
          </h2>
          <p className="mt-5 max-w-[520px] text-lg leading-relaxed text-ink-soft">
            Conte em poucas linhas o que você precisa. Respondemos pelo canal
            que você preferir.
          </p>
        </div>

        <div className="flex max-w-[420px] flex-[1_1_320px] flex-col gap-3">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener"
            className="flex min-h-16 items-center justify-between gap-4 rounded-md bg-white px-6 text-foreground transition-colors hover:bg-[#e6e7e9] motion-reduce:transition-none"
          >
            <span className="flex flex-col">
              <span className="text-[13px] text-muted-foreground">
                WhatsApp
              </span>
              <span className="text-[17px] font-semibold">Conversar agora</span>
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-[18px] flex-none"
              strokeWidth={2}
            />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <a
            href={`mailto:${site.contactEmail}`}
            className="flex min-h-16 items-center justify-between gap-4 rounded-md border border-ink-rule bg-ink px-6 text-white transition-colors hover:border-white motion-reduce:transition-none"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-[13px] text-ink-muted">E-mail</span>
              <span className="text-[17px] font-semibold [overflow-wrap:anywhere]">
                {site.contactEmail}
              </span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-[18px] flex-none"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
