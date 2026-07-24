import { useState, useEffect, useMemo } from 'react';
import { LayoutGroup } from 'motion/react';
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
    sectionLabel?: string;
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

  const { hero, rest } = useMemo(() => {
    const featured = projects.find((p) => p.featured) ?? projects[0];
    if (!featured) return { hero: null, rest: [] as Project[] };
    return {
      hero: featured,
      rest: projects.filter((p) => p.id !== featured.id),
    };
  }, [projects]);

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
      <section id="projects" className="page-shell page-pad pb-(--section-pad)">
        <p
          className="section-eyebrow"
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {texts.sectionLabel ?? `02 — ${texts.projects}`}
        </p>

        {hero && (
          <ProjectCard
            project={hero}
            index={0}
            variant="hero"
            onClick={() => handleCardClick(hero)}
            onTextHover={onTextHover}
            onTextLeave={onTextLeave}
            featuredText={texts.featuredBadge}
            liveDemoText={texts.liveDemo}
          />
        )}

        {rest.length > 0 && (
          <div className="mt-6 sm:mt-8 md:mt-10 border-t border-[oklch(94%_0.006_250/0.12)]">
            {rest.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index + 1}
                variant="compact"
                onClick={() => handleCardClick(project)}
                onTextHover={onTextHover}
                onTextLeave={onTextLeave}
                featuredText={texts.featuredBadge}
              />
            ))}
          </div>
        )}
      </section>

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
