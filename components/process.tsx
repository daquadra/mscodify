import { container } from "@/components/layout";

const steps = [
  {
    title: "Conversa",
    description: "Entendemos o problema, quem vai usar e o que precisa mudar.",
  },
  {
    title: "Proposta",
    description: "Escopo, prazo e valor por escrito, antes de começar.",
  },
  {
    title: "Desenvolvimento",
    description: "Entregas parciais para você acompanhar e validar no caminho.",
  },
  {
    title: "Entrega e suporte",
    description: "Sistema publicado e em uso, com suporte para ajustes.",
  },
];

export default function Process() {
  return (
    <section
      id="como-trabalhamos"
      aria-labelledby="processo-titulo"
      className="border-t border-rule bg-band"
    >
      <div className={`${container} py-[clamp(64px,8vw,104px)]`}>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Como trabalhamos</p>
        <h2
          id="processo-titulo"
          className="max-w-[640px] text-[clamp(28px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance"
        >
          Do problema ao sistema funcionando, em quatro etapas.
        </h2>
        <ol className="mt-12 flex flex-wrap gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex-[1_1_220px] border-t-2 border-border pt-4">
              <span className="block text-[13px] font-medium tabular-nums text-muted-foreground">
                Etapa {index + 1}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
