import Link from "next/link";
import { site } from "@/data/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6">
        <header className="pt-8">
          <Link href="/" className="font-heading text-lg font-bold tracking-tight">
            {site.name}
          </Link>
        </header>

        <main>{children}</main>

        <footer className="flex flex-wrap justify-between gap-x-6 gap-y-3 py-12 text-sm text-muted-foreground">
          <p>
            Contato:{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {site.contactEmail}
            </a>{" "}
            ·{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 hover:text-foreground"
            >
              WhatsApp
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
