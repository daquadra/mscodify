import Link from "next/link";
import { site } from "@/data/site";
import LogoMark from "@/components/logo";
import SideNav from "@/components/side-nav";

export const container = "mx-auto max-w-[1200px] px-5 sm:px-8";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-trabalhamos", label: "Como trabalhamos" },
  { href: "#produtos", label: "Produtos" },
  { href: "#contato", label: "Contato" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <header id="topo" className="border-b border-rule">
        <div className={`${container} flex min-h-18 items-center justify-between gap-6`}>
          <Link
            href="/"
            className="flex items-center gap-2.5 py-2.5 font-heading text-[19px] font-semibold tracking-[-0.02em]"
          >
            <LogoMark className="size-8 flex-none" />
            {site.name}
          </Link>
          <nav aria-label="Principal" className="flex items-center gap-8">
            <ul className="hidden gap-7 text-[15px] font-medium md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="block py-3 hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center rounded-md bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-primary motion-reduce:transition-none"
            >
              Fale conosco
            </a>
          </nav>
        </div>
      </header>

      <SideNav headerId="topo" />

      <main>{children}</main>

      <footer className="border-t border-ink-hairline bg-ink text-ink-muted">
        <div
          className={`${container} flex flex-wrap justify-between gap-x-6 gap-y-2 items-center pb-8 pt-6 text-[13px]`}
        >
          <p className="flex items-center gap-2.5">
            <LogoMark className="size-5 flex-none" />
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{new URL(site.url).host}</p>
        </div>
      </footer>
    </div>
  );
}
