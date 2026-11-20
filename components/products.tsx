import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { container } from "@/components/layout";
import { projects, type Project } from "@/data/projects";

/** Painel colorido com a captura do produto, emoldurada como navegador ou celular. */
function Showcase({ project }: { project: Project }) {
  const lift =
    "transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0";

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden rounded-t-[7px]"
      style={{ background: project.panel }}
    >
      {/* textura de grade, discreta, no espírito do fundo do site */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]"
      />

      {project.frame === "browser" ? (
        <div
          className={`absolute left-[7%] right-[-12%] top-[12%] overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10 ${lift}`}
        >
          <div className="flex h-6 items-center gap-1.5 border-b border-black/5 bg-[#f3f4f6] px-3">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
            <span className="ml-3 h-3 w-1/3 rounded-full bg-black/[0.06]" />
          </div>
          <Image
            src={project.screenshot}
            alt=""
            sizes="(min-width: 768px) 560px, 100vw"
            className="block h-auto w-full"
          />
        </div>
      ) : (
        <div
          className={`absolute left-1/2 top-[10%] w-[46%] -translate-x-1/2 overflow-hidden rounded-t-[26px] border-[6px] border-b-0 border-[#111827] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] ${lift}`}
        >
          <div className="flex h-6 items-center justify-center bg-[#4f46e5]">
            <span className="h-1.5 w-12 rounded-full bg-black/25" />
          </div>
          <Image
            src={project.screenshot}
            alt=""
            sizes="(min-width: 768px) 260px, 46vw"
            className="block h-auto w-full"
          />
        </div>
      )}
    </div>
  );
}

export default function Products() {
  return (
    <section id="produtos" aria-labelledby="produtos-titulo" className="border-t border-rule">
      <div className={`${container} py-[clamp(64px,8vw,104px)]`}>
        <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4">
          <div className="max-w-[640px]">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Produtos</p>
            <h2
              id="produtos-titulo"
              className="text-[clamp(28px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance"
            >
              Também mantemos produtos próprios.
            </h2>
          </div>
          <p className="max-w-[420px] text-[17px] leading-relaxed text-muted-foreground">
            Ferramentas que criamos, publicamos e usamos no dia a dia, abertas a
            qualquer pessoa.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-white shadow-[0_1px_2px_rgba(22,24,29,0.04)] transition-[border-color,box-shadow] hover:border-foreground/40 hover:shadow-[0_12px_40px_rgba(22,24,29,0.10)] motion-reduce:transition-none"
              >
                <Showcase project={project} />

                <span className="flex flex-1 flex-col p-7 sm:p-8">
                  <span className="flex flex-wrap items-center gap-x-3.5 gap-y-3">
                    <Image
                      src={project.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 flex-none rounded-[10px] ring-1 ring-black/5"
                    />
                    <span className="flex-1 whitespace-nowrap font-heading text-2xl font-semibold tracking-[-0.015em]">
                      {project.name}
                    </span>
                    <span className="flex-none rounded-full border border-rule px-2.5 py-0.5 text-[13px] font-medium text-muted-foreground">
                      {project.pricing}
                    </span>
                  </span>
                  <span className="mb-8 mt-4 block max-w-[480px] text-[17px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-4 border-t border-rule pt-5 text-[15px] font-medium">
                    <span className="[overflow-wrap:anywhere]">
                      Acessar {new URL(project.link).host}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-[18px] flex-none text-muted-foreground transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
                      strokeWidth={2}
                    />
                  </span>
                  <span className="sr-only">(abre em nova aba)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
