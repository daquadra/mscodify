/** Produtos próprios da mscodify, exibidos na seção "Produtos" da home. */
export interface Project {
  slug: string;
  name: string;
  description: string;
  pricing: string;
  link: string;
}

export const projects: Project[] = [
  {
    slug: "saldo-leve",
    name: "Saldo Leve",
    description:
      "Controle financeiro pessoal: orçamento do mês, metas e relatórios simples, sem planilha.",
    pricing: "Grátis e pago",
    link: "https://saldoleve.com.br/",
  },
  {
    slug: "toolpocket",
    name: "ToolPocket",
    description:
      "Conversores, calculadoras e geradores para o dia a dia, direto no navegador.",
    pricing: "Grátis",
    link: "https://toolpocket.mscodify.dev.br/",
  },
];
