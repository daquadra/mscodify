export type Status = "Grátis" | "Pago" | "Grátis e pago" | "Em desenvolvimento";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: Status[];
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    slug: "saldo-leve",
    name: "Saldo Leve",
    tagline: "Controle seu dinheiro: orçamento, metas e relatórios simples.",
    status: ["Grátis e pago"],
    image: "/generated_images/contaleve_banner_1.png",
    link: "https://saldoleve.com.br/",
  },
  {
    slug: "toolpocket",
    name: "ToolPocket",
    tagline: "Conversores, calculadoras e geradores para o dia a dia.",
    status: ["Grátis"],
    image: "/generated_images/banner_toolpocket.png",
    link: "https://toolpocket.mscodify.dev.br/",
  },
  {
    slug: "forgekitdev",
    name: "ForgeKitDev",
    tagline: "Validadores, geradores e utilitários para quem programa.",
    status: ["Grátis"],
    image: "/generated_images/banner_forgekitdev.png",
    link: "https://forgekitdev.mscodify.dev.br/",
  },
  {
    slug: "cloudless-play",
    name: "Cloudless Play",
    tagline: "Toque seus áudios offline, sem conta e sem nuvem.",
    status: ["Grátis"],
    image: "/generated_images/banner_cloudless-player.png",
    link: "https://cloudless-play.mscodify.dev.br/",
  },
  {
    slug: "vetagende",
    name: "VetAgende",
    tagline:
      "Agendamento online para clínicas e petshops, com lembretes automáticos.",
    status: ["Pago"],
    image: "/generated_images/banner_vetagende.png",
    link: "https://vetagende.com.br/",
  },
  {
    slug: "reqfly",
    name: "ReqFly",
    tagline: "Teste e automatize requisições HTTP no Windows.",
    status: ["Em desenvolvimento"],
    image: "/generated_images/reqfly_banner_3.png",
    link: "https://reqfly.mscodify.dev.br",
  },
];
