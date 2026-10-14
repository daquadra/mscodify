import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProductRow({
  name,
  tagline,
  status,
  image,
  link,
}: Project) {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        className="group flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border px-4 py-7 -mx-4 rounded-lg transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-card">
          <Image src={image} alt="" fill sizes="96px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1 basis-72">
          <h2 className="font-heading text-2xl font-bold">{name}</h2>
          <p className="mt-1 text-muted-foreground">{tagline}</p>
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span>{status.join(" · ")}</span>
          <span className="flex items-center gap-1 font-medium text-foreground group-hover:text-primary">
            Abrir
            <span className="sr-only"> {name} em nova aba</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </li>
  );
}
