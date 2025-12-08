import { ChevronDown } from 'lucide-react';

interface ProjectsProps {
  title: string;
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Projects = ({ title, onTextHover, onTextLeave }: ProjectsProps) => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="projects" className="min-h-screen flex flex-col items-center justify-center px-6">
      <h2
        className="text-6xl md:text-8xl font-bold mb-8 text-center w-fit"
        style={{ color: 'var(--text-color)' }}
        onMouseEnter={onTextHover}
        onMouseLeave={onTextLeave}
      >
        {title}
      </h2>

      <button
        onClick={scrollToProjects}
        className="group animate-bounce hover:animate-none transition-all duration-300"
        aria-label="Scroll to projects"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ChevronDown size={48} />
      </button>
    </div>
  );
};
