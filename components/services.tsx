"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Globe, Database, Lock, Zap } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Next.js & Nuxt.js",
    description: "Aplicações web modernas com React e Vue, renderização server-side e geração estática para máxima performance."
  },
  {
    icon: Code,
    title: "Laravel",
    description: "Sistemas backend robustos e escaláveis com Laravel, seguindo as melhores práticas e padrões de desenvolvimento."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Interfaces lindas e intuitivas com Tailwind CSS que funcionam perfeitamente em qualquer dispositivo."
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description: "Banco de dados relacional poderoso com queries otimizadas e estrutura escalável para suas aplicações."
  },
  {
    icon: Lock,
    title: "Segurança",
    description: "Implementação de autenticação, autorização e proteção de dados seguindo melhores práticas do mercado."
  },
  {
    icon: Zap,
    title: "Alta Performance",
    description: "Otimização de código, cache inteligente e arquitetura pensada para velocidade máxima."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Minhas Especialidades
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stack tecnológica moderna focada em resultados e qualidade de código.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/40 border border-white/5 p-8 rounded-xl hover:bg-card/60 transition-colors group"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
