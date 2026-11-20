import { projects } from "@/data/projects";

export default function Hero() {
  const inDevelopment = projects.filter(
    (project) => project.access === "Em desenvolvimento"
  ).length;

  const stats = [
    { label: "Produtos", value: projects.length },
    { label: "No ar", value: projects.length - inDevelopment },
    { label: "Em desenvolvimento", value: inDevelopment, wide: true },
  ];

  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap items-end gap-x-20 gap-y-12 px-5 pb-[clamp(56px,7vw,88px)] pt-[clamp(56px,8vw,104px)] sm:px-8">
      <div className="min-w-0 flex-[999_1_560px]">
        <p className="mb-6 text-sm font-medium text-muted-foreground">
          Catálogo de produtos
        </p>
        <h1 className="max-w-[820px] text-[clamp(38px,5.2vw,66px)] font-semibold leading-[1.04] tracking-[-0.028em] text-balance">
          Software simples para tarefas do dia a dia.
        </h1>
      </div>

      <div className="max-w-[420px] flex-[1_1_320px]">
        <p className="text-lg leading-relaxed text-muted-foreground">
          A mscodify cria e mantém pequenos produtos web. Cada um resolve uma
          tarefa específica, e a maioria abre direto no navegador.
        </p>
        <dl className="mt-8 flex gap-6 border-t border-border pt-4">
          {stats.map((stat) => (
            <div key={stat.label} className={stat.wide ? "flex-[1.6_1_0]" : "flex-1"}>
              <dt className="text-[13px] text-muted-foreground">{stat.label}</dt>
              <dd className="mt-1 font-heading text-[28px] font-semibold tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
