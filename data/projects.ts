export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  badges: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    title: "ReqFly - Http Requests Simplified",
    description: "Sistema windows para gerenciamento e automação de requisições HTTP, facilitando testes e integrações.",
    image: "/generated_images/reqfly_banner_3.png",
    tags: ["NextJs", "React", "Node.js", "Tauri", "Tailwind"],
    badges: ["Em desenvolvimento", "Free"],
    link: "https://reqfly.mscodify.dev.br",
  },
  {
    title: "Saldo Leve - Personal Finance Manager",
    description:
      "Aplicação web para gerenciamento financeiro pessoal, com orçamentos, metas e relatórios detalhados.",
    image: "/generated_images/contaleve_banner_1.png",
    tags: ["Nuxt.js", "Tailwind", "Node.js"],
    badges: ["Em desenvolvimento", "Free/Paid", "MVP", "PWA"],
    link: "https://saldoleve.com.br/",
  },
  {
    title: "ForgeKitDev - Developer Tools Suite",
    description:
      "Aplicação web com ferramentas essenciais para desenvolvedores, incluindo geradores de código, validadores e utilitários.",
    image: "/generated_images/banner_forgekitdev.png",
    tags: ["React.js", "Tailwind", "Node.js"],
    badges: ["Free", "PWA"],
    link: "https://forgekitdev.mscodify.dev.br/",
  },
  {
    title: "ToolPocket - Tools for everyday use",
    description:
      "Aplicação com ferramentas práticas para facilitar tarefas diárias, como conversores, calculadoras e geradores.",
    image: "/generated_images/banner_toolpocket.png",
    tags: ["React.js", "Node.js"],
    badges: ["Free", "PWA"],
    link: "https://toolpocket.mscodify.dev.br/",
  },
    {
    title: "Cloudless Play - Free player for your offline media",
    description:
      "Player gratuito para reprodução de mídia offline, suportando diversos formatos de áudio.",
    image: "/generated_images/banner_cloudless-player.png",
    tags: ["Vite", "Node.js"],
    badges: ["Free", "PWA"],
    link: "https://cloudless-play.mscodify.dev.br/",
  }
];
