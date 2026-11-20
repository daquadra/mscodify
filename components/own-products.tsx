import { container } from "@/components/layout";
import { projects } from "@/data/projects";

export default function OwnProducts() {
  return (
    <section aria-labelledby="produtos-titulo" className="border-t border-rule">
      <div className={`${container} flex flex-wrap items-baseline gap-x-8 gap-y-3 py-10`}>
        <h2 id="produtos-titulo" className="flex-none font-sans text-sm font-semibold">
          Produtos próprios
        </h2>
        <ul className="flex flex-[1_1_400px] flex-wrap gap-x-6 gap-y-1 text-[15px] text-muted-foreground">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener"
                className="block py-2 underline-offset-[3px] hover:text-foreground hover:underline"
              >
                {project.name}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
