import { useState, useEffect } from 'react';
import { LayoutGroup } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

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

interface ProjectsProps {
  texts: {
    projects: string;
    featuredBadge: string;
    featuredProject: string;
    technologies: string;
    viewOnGithub: string;
    viewOnUnityVC: string;
    liveDemo: string;
  };
  language: 'fr' | 'en';
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Projects = ({ texts, language, onTextHover, onTextLeave }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await import(`../data/project-${language}.json`);
        setProjects(data.projects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, [language]);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 150);
  };

  return (
    <LayoutGroup>
      <div id="projects" className="flex flex-col items-center justify-center px-6 py-16 md:py-20">
        <h2
          className="text-4xl sm:text-5xl md:text-8xl font-bold mb-8 md:mb-16 text-center w-fit"
          style={{ color: 'var(--text-color)' }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {texts.projects}
        </h2>

        {/* Projects Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project)}
              onTextHover={onTextHover}
              onTextLeave={onTextLeave}
              featuredText={texts.featuredBadge}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTextHover={onTextHover}
        onTextLeave={onTextLeave}
        texts={{
          featuredProject: texts.featuredProject,
          technologies: texts.technologies,
          viewOnGithub: texts.viewOnGithub,
          viewOnUnityVC: texts.viewOnUnityVC,
          liveDemo: texts.liveDemo,
        }}
      />
    </LayoutGroup>
  );
};
