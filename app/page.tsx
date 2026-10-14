import Layout from "@/components/layout";
import Hero from "@/components/hero";
import ProductRow from "@/components/product-row";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ul>
        {projects.map((project, index) => (
          <ProductRow key={project.slug} index={index} {...project} />
        ))}
      </ul>
    </Layout>
  );
}
