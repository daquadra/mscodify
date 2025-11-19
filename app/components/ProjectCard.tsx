interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  technologies: string[];
  icon: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-background rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 block"
    >
      <div className="h-48 bg-linear-to-br from-primary to-primary-dark flex items-center justify-center text-6xl">
        {project.icon}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
        <p className="text-foreground/70 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
