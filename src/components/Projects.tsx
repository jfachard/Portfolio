import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LayoutGroup } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  caseStudy?: {
    problem: string;
    decision: string;
    result: string;
  };
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
    caseStudy: {
      problem: string;
      decision: string;
      result: string;
    };
  };
  language: 'fr' | 'en';
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

const projectIdFromHash = () => {
  const id = window.location.hash.replace(/^#/, '');
  return id || null;
};

const clearProjectHash = () => {
  const { pathname, search } = window.location;
  window.history.replaceState(null, '', `${pathname}${search}`);
};

export const Projects = ({ texts, language, onTextHover, onTextLeave }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const didScrollToHash = useRef(false);

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

  const openProject = useCallback((project: Project, { syncHash = true } = {}) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    if (syncHash && projectIdFromHash() !== project.id) {
      window.history.pushState({ project: project.id }, '', `#${project.id}`);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 150);
    if (projects.some((p) => p.id === projectIdFromHash())) {
      clearProjectHash();
    }
  }, [projects]);

  const handleCardClick = (project: Project) => {
    openProject(project);
  };

  // Deep link: #wordev → open modal (+ scroll once on landing)
  useEffect(() => {
    if (!projects.length) return;

    const syncFromUrl = () => {
      const id = projectIdFromHash();
      if (!id) {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 150);
        return;
      }

      const project = projects.find((p) => p.id === id);
      if (!project) return;

      setSelectedProject(project);
      setIsModalOpen(true);

      if (!didScrollToHash.current) {
        didScrollToHash.current = true;
        requestAnimationFrame(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, [projects]);

  // Keep modal content in sync when switching FR/EN
  useEffect(() => {
    if (!selectedProject || !projects.length) return;
    const updated = projects.find((p) => p.id === selectedProject.id);
    if (updated && updated !== selectedProject) setSelectedProject(updated);
  }, [projects, selectedProject]);

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
        texts={{
          featuredProject: texts.featuredProject,
          technologies: texts.technologies,
          viewOnGithub: texts.viewOnGithub,
          viewOnUnityVC: texts.viewOnUnityVC,
          liveDemo: texts.liveDemo,
          caseStudy: texts.caseStudy,
        }}
      />
    </LayoutGroup>
  );
};
