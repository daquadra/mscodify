/** Produtos próprios da mscodify, citados de forma discreta na home. */
export interface Project {
  slug: string;
  name: string;
  link: string;
}

export const projects: Project[] = [
  { slug: "saldo-leve", name: "Saldo Leve", link: "https://saldoleve.com.br/" },
  {
    slug: "toolpocket",
    name: "ToolPocket",
    link: "https://toolpocket.mscodify.dev.br/",
  },
  {
    slug: "forgekitdev",
    name: "ForgeKitDev",
    link: "https://forgekitdev.mscodify.dev.br/",
  },
  {
    slug: "cloudless-play",
    name: "Cloudless Play",
    link: "https://cloudless-play.mscodify.dev.br/",
  },
  { slug: "vetagende", name: "VetAgende", link: "https://vetagende.com.br/" },
  { slug: "reqfly", name: "ReqFly", link: "https://reqfly.mscodify.dev.br" },
];
