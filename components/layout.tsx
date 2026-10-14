import Link from "next/link";
import { site } from "@/data/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <header className="mx-auto max-w-5xl px-6 pt-8">
        <Link
          href="/"
          className="font-heading text-2xl font-extrabold tracking-tight"
        >
          {site.name}
        </Link>
      </header>

      <main>{children}</main>

      <footer className="border-t-2 border-foreground bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-x-6 gap-y-3 px-6 py-10 text-base">
          <p>
            Dúvida ou sugestão?{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              {site.contactEmail}
            </a>{" "}
            ou{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="font-semibold underline underline-offset-4 hover:no-underline"
            >
              WhatsApp
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
