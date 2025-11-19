'use client';

import Image from 'next/image';

interface Technology {
  name: string;
  logo?: string;
  website?: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  technologies: Technology[];
  backgroundImage?: string;
  logo?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleCardClick = () => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-background rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 ${
        project.link && project.link !== '#' ? 'cursor-pointer' : ''
      }`}
    >
      {/* Background Image com Desfoque */}
      <div className="relative h-64 overflow-hidden">
        {project.backgroundImage ? (
          <Image
            src={project.backgroundImage}
            alt={project.name}
            fill
            className="object-cover blur-sm group-hover:blur-none group-hover:scale-105 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />

        {/* Logo do Projeto */}
        {project.logo && (
          <div className="absolute top-6 left-6 w-16 h-16 bg-background rounded-xl shadow-lg p-2 flex items-center justify-center">
            <Image
              src={project.logo}
              alt={`${project.name} logo`}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6 relative">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-foreground/70 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tecnologias */}
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech, index) => (
            tech.website ? (
              <a
                key={index}
                href={tech.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs bg-foreground/5 hover:bg-primary/10 hover:text-primary border border-foreground/10 hover:border-primary/30 px-3 py-1.5 rounded-full transition-all"
              >
                {tech.logo && (
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                )}
                <span>{tech.name}</span>
              </a>
            ) : (
              <span
                key={index}
                className="flex items-center gap-2 text-xs bg-foreground/5 border border-foreground/10 px-3 py-1.5 rounded-full"
              >
                {tech.logo && (
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                )}
                <span>{tech.name}</span>
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
