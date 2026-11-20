import { ArrowUpRight } from "lucide-react";
import { container } from "@/components/layout";
import { projects } from "@/data/projects";

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

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col rounded-lg border border-rule bg-white p-7 transition-colors hover:border-foreground motion-reduce:transition-none sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="text-2xl font-semibold tracking-[-0.015em] font-heading">
                    {project.name}
                  </span>
                  <span className="mt-1 flex-none rounded-full border border-rule px-2.5 py-0.5 text-[13px] font-medium text-muted-foreground">
                    {project.pricing}
                  </span>
                </span>
                <span className="mb-8 mt-3 block max-w-[460px] text-[17px] leading-relaxed text-muted-foreground">
                  {project.description}
                </span>
                <span className="mt-auto flex items-center justify-between gap-4 border-t border-rule pt-5 text-[15px] font-medium">
                  <span className="[overflow-wrap:anywhere]">{new URL(project.link).host}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-[18px] flex-none text-muted-foreground transition-colors group-hover:text-foreground motion-reduce:transition-none"
                    strokeWidth={2}
                  />
                </span>
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
