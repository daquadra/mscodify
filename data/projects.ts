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
    title: "ContaLeve - Personal Finance Manager",
    description:
      "Aplicação web para gerenciamento financeiro pessoal, com orçamentos, metas e relatórios detalhados.",
    image: "/generated_images/contaleve_banner_1.png",
    tags: ["Nuxt.js", "Tailwind", "Node.js"],
    badges: ["Em desenvolvimento", "Free/Paid", "MVP", "PWA"],
    link: "#",
  },
  {
    title: "Cali30 - Fitness Tracker App",
    description:
      "Aplicação web para rastreamento de atividades físicas, monitoramento de progresso e definição de metas de saúde.",
    image: "",
    tags: ["Next.js", "Tailwind", "SEO"],
    badges: ["MVP", "Free"],
    link: "#",
  },
];
