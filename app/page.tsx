import Image from "next/image";
import Logo from "./components/Logo";
import ThemeToggle from "./components/ThemeToggle";
import MobileMenu from "./components/MobileMenu";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import AboutSection from "./components/AboutSection";
import projectsData from "../data/projects.json";
import profileData from "../data/profile.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#servicos" className="text-foreground/70 hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#projetos" className="text-foreground/70 hover:text-primary transition-colors">
              Projetos
            </a>
            <a href="#sobre" className="text-foreground/70 hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-foreground/70 hover:text-primary transition-colors">
              Contato
            </a>
            <ThemeToggle />
            <a
              href="#contato"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition-colors font-medium"
            >
              Fale Conosco
            </a>
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero.webp"
          alt="Desenvolvimento de Software"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Transforme suas{" "}
            <span className="text-primary">ideias</span> em{" "}
            <span className="text-primary">realidade digital</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Desenvolvimento de software sob medida para impulsionar seu negócio.
            Soluções web, PWAs e análise de sistemas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contato"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors font-medium text-center"
            >
              Iniciar Projeto
            </a>
            <a
              href="#servicos"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full transition-colors font-medium text-center"
            >
              Ver Serviços
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos <span className="text-primary">Serviços</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Soluções completas para transformar seu negócio
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-3">Desenvolvimento Web</h3>
              <p className="text-foreground/70">
                Sites institucionais, e-commerce, sistemas web e aplicações personalizadas com tecnologias modernas e escaláveis.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3">Progressive Web Apps</h3>
              <p className="text-foreground/70">
                PWAs que funcionam em qualquer dispositivo, com experiência de app nativo e acesso offline.
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3">Análise de Sistemas</h3>
              <p className="text-foreground/70">
                Avaliação técnica de sistemas existentes, identificação de melhorias e planejamento de arquitetura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 px-6 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Projetos em <span className="text-primary">Destaque</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Conheça alguns dos trabalhos que desenvolvemos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <section id="contato" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Vamos <span className="text-primary">Conversar?</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Preencha o formulário e entre em contato via WhatsApp
            </p>
          </div>

          <div className="bg-background border border-foreground/10 rounded-2xl p-8 shadow-lg">
            <ContactForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-foreground/60 mb-4">Ou entre em contato diretamente:</p>
            <a
              href={`mailto:${profileData.email}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              📧 {profileData.email}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} MSCodify. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
