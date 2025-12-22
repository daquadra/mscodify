import Layout from "@/components/layout";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Contact from "@/components/contact";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <Layout>
      <Hero />

      <section id="projects" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Sistemas em Destaque
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Uma seleção de projetos recentes que demonstram capacidade técnica
                e atenção aos detalhes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      <Services />
      <Contact />
    </Layout>
  );
}
