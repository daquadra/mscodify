import Layout from "@/components/layout";
import Hero from "@/components/hero";
import ProductRow from "@/components/product-row";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ul className="border-b border-border">
        {projects.map((project) => (
          <ProductRow key={project.slug} {...project} />
        ))}
      </ul>
    </Layout>
  );
}
