import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
  featuredText: string;
}

export const ProjectCard = ({ project, onClick, onTextHover, onTextLeave, featuredText }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="project-card group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
      onClick={onClick}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="relative w-full aspect-3/2 overflow-hidden">
        <div
          className={`absolute inset-0 bg-linear-to-br from-purple-500/20 to-blue-500/20 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'var(--text-color)',
          }}
        >
          {project.tags[0]}
        </div>

        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.3)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              color: 'var(--text-color)',
            }}
          >
            {featuredText}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3
          className="text-xl font-bold mb-1.5 transition-colors duration-300"
          style={{ color: 'var(--text-color)' }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {project.title}
        </h3>
        <p
          className="text-sm mb-2 opacity-80"
          style={{ color: 'var(--text-color)' }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {project.subtitle}
        </p>
        <p
          className="text-xs opacity-60 line-clamp-2"
          style={{ color: 'var(--text-color)' }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs rounded-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--text-color)',
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span
              className="px-2 py-0.5 text-xs rounded-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--text-color)',
              }}
            >
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-3xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};
