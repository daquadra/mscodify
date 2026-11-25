import type { StaticImageData } from "next/image";
import saldoLeveShot from "@/public/products/saldoleve.jpg";
import saldoLeveIcon from "@/public/products/saldoleve-icon.png";
import toolPocketShot from "@/public/products/toolpocket.jpg";
import toolPocketIcon from "@/public/products/toolpocket-icon.png";
import scrapperShot from "@/public/products/scrapper-protocol.jpg";
import scrapperIcon from "@/public/products/scrapper-protocol-icon.png";

/** Produtos próprios da mscodify, exibidos na seção "Produtos" da home. */
export interface Project {
  slug: string;
  name: string;
  description: string;
  pricing: string;
  link: string;
  icon: StaticImageData;
  /** Captura de tela real do produto. */
  screenshot: StaticImageData;
  /** "browser" emoldura como janela de navegador; "phone" como tela de celular. */
  frame: "browser" | "phone";
  /** Fundo do painel da imagem, nas cores do próprio produto. */
  panel: string;
  /** Cor da barra de status na moldura de celular. */
  statusBar?: string;
}

export const projects: Project[] = [
  {
    slug: "saldo-leve",
    name: "Saldo Leve",
    description:
      "Controle financeiro com a Lima, uma assistente de IA: diga, fale ou fotografe o gasto e ela organiza o mês para você.",
    pricing: "Grátis e pago",
    link: "https://saldoleve.com.br/",
    icon: saldoLeveIcon,
    screenshot: saldoLeveShot,
    frame: "browser",
    panel:
      "radial-gradient(120% 90% at 0% 0%, #1f6f4a 0%, transparent 55%), linear-gradient(135deg, #0b2053 0%, #10295f 100%)",
  },
  {
    slug: "toolpocket",
    name: "ToolPocket",
    description:
      "Conversores, calculadoras e controles para o dia a dia, como combustível, lista de compras e racha conta, direto no celular.",
    pricing: "Grátis",
    link: "https://toolpocket.mscodify.dev.br/",
    icon: toolPocketIcon,
    screenshot: toolPocketShot,
    frame: "phone",
    panel:
      "radial-gradient(110% 90% at 100% 0%, #818cf8 0%, transparent 55%), linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    statusBar: "#4f46e5",
  },
  {
    slug: "scrapper-protocol",
    name: "Scrapper Protocol",
    description:
      "Jogo de ação para celular, jogado com um polegar: pilote um mech de sucata, colete peças e derrube o Titã de cada setor.",
    pricing: "Em breve",
    link: "https://scrapper-protocol.mscodify.dev.br/",
    icon: scrapperIcon,
    screenshot: scrapperShot,
    frame: "phone",
    panel:
      "radial-gradient(110% 90% at 0% 0%, #1b7f95 0%, transparent 55%), linear-gradient(135deg, #0b1020 0%, #121a30 100%)",
    statusBar: "#0b1020",
  },
];
