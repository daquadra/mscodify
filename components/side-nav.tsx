"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  MessageCircleMore,
  Package,
  Route,
  type LucideIcon,
} from "lucide-react";
import LogoMark from "@/components/logo";

type Item = { id: string; label: string; icon: LucideIcon; highlight?: boolean };

const items: Item[] = [
  { id: "servicos", label: "Serviços", icon: BriefcaseBusiness },
  { id: "como-trabalhamos", label: "Como trabalhamos", icon: Route },
  { id: "produtos", label: "Produtos", icon: Package },
  { id: "contato", label: "Fale conosco", icon: MessageCircleMore, highlight: true },
];

const linkBase =
  "group relative flex size-10 items-center md:size-11 justify-center rounded-xl transition-colors motion-reduce:transition-none";

/** Rótulo que aparece à esquerda do ícone no hover/foco (só em telas médias+). */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none md:block"
    >
      {children}
    </span>
  );
}

/**
 * Barra de navegação presa à direita da tela. Aparece quando o header sai da
 * tela (ao rolar) e marca a seção visível no momento.
 */
export default function SideNav({ headerId }: { headerId: string }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const header = document.getElementById(headerId);
    if (!header) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting),
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, [headerId]);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    // Seção ativa: a que cruza a faixa central da tela.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navegação rápida"
      inert={!visible}
      className={`on-dark fixed right-0 top-1/2 z-50 -translate-y-1/2 transition duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
      }`}
    >
      <ul className="flex flex-col gap-1 rounded-l-2xl border border-r-0 md:p-1.5 border-white/10 bg-ink/95 p-1 shadow-[0_8px_30px_rgba(22,24,29,0.25)] backdrop-blur">
        <li>
          <a href="#" aria-label="Voltar ao início" className={`${linkBase} hover:bg-white/10`}>
            <LogoMark className="size-6 md:size-7" />
            <Label>Início</Label>
          </a>
        </li>
        <li aria-hidden="true" className="mx-2.5 my-0.5 h-px bg-white/10" />
        {items.map(({ id, label, icon: Icon, highlight }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "location" : undefined}
                className={`${linkBase} ${
                  highlight
                    ? "bg-primary text-white hover:bg-primary-hover"
                    : isActive
                      ? "bg-white/12 text-white"
                      : "text-ink-soft hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.9} />
                {isActive && !highlight && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[#22d3ee]"
                  />
                )}
                <Label>{label}</Label>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
