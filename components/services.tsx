import { container } from "@/components/layout";

const services = [
  {
    title: "Sistemas web sob medida",
    description:
      "Sistemas para organizar a rotina da empresa: cadastros, agendamentos, controle financeiro, painéis e relatórios. Funcionam no navegador, no computador e no celular.",
  },
  {
    title: "Automação de tarefas",
    description:
      "Integrações entre sistemas e rotinas automáticas que tiram da equipe o trabalho repetitivo, como planilhas, avisos e conferências.",
  },
  {
    title: "Manutenção e evolução",
    description:
      "Correções, melhorias e novas funções em sistemas que já existem, com acompanhamento contínuo.",
  },
];

export default function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="border-t border-rule">
      <div
        className={`${container} flex flex-wrap gap-x-20 gap-y-10 py-[clamp(64px,8vw,104px)]`}
      >
        <div className="max-w-[340px] flex-[1_1_260px]">
          <p className="mb-3 text-sm font-medium text-muted-foreground">Serviços</p>
          <h2
            id="servicos-titulo"
            className="text-[clamp(28px,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em]"
          >
            O que fazemos
          </h2>
        </div>

        <ol className="flex flex-[999_1_560px] flex-col border-b border-rule">
          {services.map((service, index) => (
            <li
              key={service.title}
              className={`flex flex-wrap gap-x-8 gap-y-2 border-t py-7 ${
                index === 0 ? "border-border" : "border-rule"
              }`}
            >
              <span
                aria-hidden="true"
                className="flex-[0_0_40px] pt-1.5 text-[13px] font-medium tabular-nums text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-[1_1_400px]">
                <h3 className="text-2xl font-semibold tracking-[-0.015em]">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
