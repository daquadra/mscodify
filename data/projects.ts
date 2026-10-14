export type Status = "Grátis" | "Pago" | "Grátis e pago" | "Em desenvolvimento";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: Status[];
  image: string;
  color: string;
  link: string;
}

export const projects: Project[] = [
  {
    slug: "saldo-leve",
    name: "Saldo Leve",
    tagline: "Controle seu dinheiro: orçamento, metas e relatórios simples.",
    status: ["Grátis e pago"],
    image: "/generated_images/contaleve_banner_1.png",
    color: "oklch(0.82 0.14 150)",
    link: "https://saldoleve.com.br/",
  },
  {
    slug: "toolpocket",
    name: "ToolPocket",
    tagline: "Conversores, calculadoras e geradores para o dia a dia.",
    status: ["Grátis"],
    image: "/generated_images/banner_toolpocket.png",
    color: "oklch(0.80 0.13 35)",
    link: "https://toolpocket.mscodify.dev.br/",
  },
  {
    slug: "forgekitdev",
    name: "ForgeKitDev",
    tagline: "Validadores, geradores e utilitários para quem programa.",
    status: ["Grátis"],
    image: "/generated_images/banner_forgekitdev.png",
    color: "oklch(0.80 0.11 295)",
    link: "https://forgekitdev.mscodify.dev.br/",
  },
  {
    slug: "cloudless-play",
    name: "Cloudless Play",
    tagline: "Toque seus áudios offline, sem conta e sem nuvem.",
    status: ["Grátis"],
    image: "/generated_images/banner_cloudless-player.png",
    color: "oklch(0.83 0.09 230)",
    link: "https://cloudless-play.mscodify.dev.br/",
  },
  {
    slug: "vetagende",
    name: "VetAgende",
    tagline:
      "Agendamento online para clínicas e petshops, com lembretes automáticos.",
    status: ["Pago"],
    image: "/generated_images/banner_vetagende.png",
    color: "oklch(0.84 0.10 0)",
    link: "https://vetagende.com.br/",
  },
  {
    slug: "reqfly",
    name: "ReqFly",
    tagline: "Teste e automatize requisições HTTP no Windows.",
    status: ["Em desenvolvimento"],
    image: "/generated_images/reqfly_banner_3.png",
    color: "oklch(0.86 0.12 65)",
    link: "https://reqfly.mscodify.dev.br",
  },
];
