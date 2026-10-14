import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";

export default function ProductRow({
  name,
  tagline,
  status,
  image,
  color,
  link,
  index,
}: Project & { index: number }) {
  const style = { "--accent": color, "--i": index + 2 } as CSSProperties;

  return (
    <li className="rise border-t-2 border-foreground" style={style}>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        className="group block transition-colors duration-200 hover:bg-(--accent) focus-visible:bg-(--accent) focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-foreground"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-x-8 gap-y-5 px-6 py-8 md:grid-cols-[auto_1fr_auto] md:py-10">
          <div
            className="w-40 rounded-2xl p-2 transition-transform duration-300 ease-out motion-safe:group-hover:-rotate-3 motion-safe:group-hover:scale-105 md:w-48"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-background">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 768px) 176px, 144px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl">
              {name}
            </h2>
            <p className="mt-3 max-w-md text-lg leading-snug text-muted-foreground group-hover:text-foreground">
              {tagline}
            </p>
          </div>

          <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-3">
            <span className="rounded-full border-2 border-foreground px-3 py-1 text-sm font-semibold">
              {status.join(" · ")}
            </span>
            <span className="flex size-12 items-center justify-center rounded-full bg-foreground text-background md:order-first">
              <ArrowUpRight
                aria-hidden="true"
                className="size-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="sr-only">Abrir {name} em nova aba</span>
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
