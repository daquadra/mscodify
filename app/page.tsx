import Layout from "@/components/layout";
import Hero from "@/components/hero";
import ProductRow from "@/components/product-row";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <section
        id="produtos"
        aria-labelledby="produtos-titulo"
        className="mx-auto max-w-[1200px] px-5 pb-[clamp(72px,9vw,120px)] sm:px-8"
      >
        <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3.5">
          <h2 id="produtos-titulo" className="font-sans text-[15px] font-semibold">
            Produtos
          </h2>
          <p className="text-sm text-muted-foreground">{projects.length} produtos</p>
        </div>
        <ul>
          {projects.map((project, index) => (
            <ProductRow key={project.slug} index={index} {...project} />
          ))}
        </ul>
      </section>
    </Layout>
  );
}
