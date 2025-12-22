"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Sistemas", href: "#projects" },
    { name: "Serviços", href: "#services" },
    { name: "Contato", href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-heading font-bold tracking-tighter flex items-center gap-2"
          >
            <Code2 className="h-6 w-6 text-primary" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              mscodify
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("#contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
            >
              Orçar Projeto
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black/10"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 glass bg-background/60 border-b border-border/40 p-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-medium text-foreground py-2 border-b border-white/5 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection("#contact")}
                className="w-full mt-2 bg-primary font-bold"
              >
                Orçar Projeto
              </Button>
            </motion.div>
          </>
        )}
      </nav>

      {/* Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/50">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-heading font-bold">mscodify</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              Desenvolvimento de sistemas robustos e escaláveis para impulsionar o seu negócio.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection("#projects")} className="text-muted-foreground hover:text-primary cursor-pointer">Portfólio</button></li>
              <li><button onClick={() => scrollToSection("#services")} className="text-muted-foreground hover:text-primary cursor-pointer">Serviços</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li><a href="mailto:suporte@mscodify.dev.br" className="text-muted-foreground hover:text-primary transition-colors">suporte@mscodify.dev.br</a></li>
              <li><a href="https://mscodify.dev.br" className="text-muted-foreground hover:text-primary transition-colors">mscodify.dev.br</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} mscodify. Todos os direitos reservados. | <a href="https://mscodify.dev.br" className="hover:text-primary transition-colors">mscodify.dev.br</a>
        </div>
      </footer>
    </div>
  );
}
