import { useState, useEffect, useCallback, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { SectionHeading } from './SectionHeading';
import { getHashId, resolveSectionId, setHash } from '../lib/hash';

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
  imageFit?: 'cover' | 'contain';
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

interface ProjectsProps {
  texts: {
    projects: string;
    featuredProject: string;
    technologies: string;
    viewOnGithub: string;
    viewOnUnityVC: string;
    liveDemo: string;
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

  const openProject = useCallback((project: Project, { syncHash = true } = {}) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    if (syncHash && getHashId() !== project.id) {
      setHash(project.id, 'push');
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 150);
    if (projects.some((p) => p.id === getHashId())) {
      setHash('projects', 'replace');
    }
  }, [projects]);

  useEffect(() => {
    if (!projects.length) return;

    const syncFromUrl = () => {
      const id = getHashId();
      if (!id || resolveSectionId(id)) {
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

  useEffect(() => {
    if (!selectedProject || !projects.length) return;
    const updated = projects.find((p) => p.id === selectedProject.id);
    if (updated && updated !== selectedProject) setSelectedProject(updated);
  }, [projects, selectedProject]);

  return (
    <>
      <section id="projects" className="page-shell page-pad pb-(--section-pad)">
        <SectionHeading
          title={texts.projects}
          onTextHover={onTextHover}
          onTextLeave={onTextLeave}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openProject(project)}
              liveDemoText={texts.liveDemo}
            />
          ))}
        </div>
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
    </>
  );
};
