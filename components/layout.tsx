import Link from "next/link";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

const container = "mx-auto max-w-[1200px] px-5 sm:px-8";

function Wordmark() {
  return (
    <>
      <span aria-hidden="true" className="block size-5 rounded-[3px] bg-foreground" />
      {site.name}
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <header className="border-b border-rule">
        <div className={`${container} flex min-h-18 items-center justify-between gap-6`}>
          <Link
            href="/"
            className="flex items-center gap-2.5 py-2.5 font-heading text-[19px] font-semibold tracking-[-0.02em]"
          >
            <Wordmark />
          </Link>
          <nav aria-label="Principal">
            <ul className="flex gap-7 text-[15px] font-medium">
              <li>
                <a href="#produtos" className="block py-3 hover:text-primary">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#contato" className="block py-3 hover:text-primary">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer id="contato" className="border-t border-border bg-footer">
        <div className={`${container} flex flex-wrap gap-x-20 gap-y-10 pb-12 pt-16`}>
          <div className="flex-[999_1_320px]">
            <p className="flex items-center gap-2.5 font-heading text-[19px] font-semibold tracking-[-0.02em]">
              <Wordmark />
            </p>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
              Pequenos produtos web para tarefas do dia a dia.
            </p>
          </div>

          <nav aria-labelledby="rodape-produtos" className="flex-[1_1_180px]">
            <h2
              id="rodape-produtos"
              className="mb-3 font-sans text-[13px] font-semibold text-muted-foreground"
            >
              Produtos
            </h2>
            <ul className="text-[15px]">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener"
                    className="block py-1.5 hover:text-primary"
                  >
                    {project.name}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-[1_1_240px]">
            <h2 className="mb-3 font-sans text-[13px] font-semibold text-muted-foreground">
              Contato
            </h2>
            <p className="mb-2 text-[15px] leading-relaxed text-muted-foreground">
              Dúvidas, sugestões e suporte.
            </p>
            <ul className="text-[15px] font-medium">
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="block py-1.5 underline-offset-[3px] hover:text-primary hover:underline"
                >
                  {site.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="block py-1.5 underline-offset-[3px] hover:text-primary hover:underline"
                >
                  WhatsApp
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={container}>
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-rule pb-8 pt-5 text-[13px] text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <p>{new URL(site.url).host}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
