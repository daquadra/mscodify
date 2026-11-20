import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProductRow({
  name,
  tagline,
  audience,
  access,
  image,
  link,
  index,
}: Project & { index: number }) {
  const inDevelopment = access === "Em desenvolvimento";
  const host = new URL(link).host;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="border-b border-rule">
      <a
        href={link}
        target="_blank"
        rel="noopener"
        className="group grid grid-cols-1 items-start gap-x-10 gap-y-5 px-2 py-8 transition-colors duration-150 hover:bg-surface focus-visible:bg-surface motion-reduce:transition-none sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,24rem)]"
      >
        <div className="flex items-start gap-6">
          <span
            aria-hidden="true"
            className="w-6 pt-[3px] text-[13px] font-medium tabular-nums text-muted-foreground"
          >
            {number}
          </span>
          <div className="relative h-[115px] w-[184px] overflow-hidden rounded border border-rule bg-surface">
            <Image
              src={image}
              alt=""
              fill
              sizes="184px"
              className="object-cover object-[left_top]"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.015em]">
            {name}
          </h3>
          <p className="mt-2 max-w-[440px] text-[17px] leading-normal text-muted-foreground">
            {tagline}
          </p>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5 self-center text-[15px] font-semibold text-primary underline-offset-[3px] group-hover:underline">
              {inDevelopment ? "Ver página" : "Abrir"}
              <ArrowUpRight aria-hidden="true" className="size-[15px]" strokeWidth={2} />
              <span className="sr-only"> {name} (abre em nova aba)</span>
            </span>
            <span className="text-[13px] text-muted-foreground">{host}</span>
          </p>
        </div>

        <dl className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-x-8 gap-y-4 sm:col-start-2 lg:col-start-3 lg:row-start-1">
          <div>
            <dt className="text-[13px] text-muted-foreground">Para quem</dt>
            <dd className="mt-1 text-[15px] font-medium">{audience}</dd>
          </div>
          <div>
            <dt className="text-[13px] text-muted-foreground">Acesso</dt>
            <dd className="mt-1 flex items-center gap-2 text-[15px] font-medium">
              {inDevelopment && (
                <span
                  aria-hidden="true"
                  className="block size-2 flex-none rounded-full border-[1.5px] border-foreground"
                />
              )}
              {access}
            </dd>
          </div>
        </dl>
      </a>
    </li>
  );
}
