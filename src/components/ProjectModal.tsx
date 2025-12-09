import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch } from 'lucide-react';

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

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
  texts: {
    featuredProject: string;
    technologies: string;
    viewOnGithub: string;
    viewOnUnityVC: string;
    liveDemo: string;
  };
}

export const ProjectModal = ({ project, isOpen, onClose, onTextHover, onTextLeave, texts }: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={onClose}
        >
          <motion.div
            layoutId={`project-${project.id}`}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              backgroundColor: 'rgba(20, 20, 30, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="var(--text-color)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(20,20,30,0.95)] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-6">
            {project.featured && (
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  color: 'var(--text-color)',
                }}
              >
                {texts.featuredProject}
              </div>
            )}
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-color)' }}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {project.title}
            </h2>
            <p
              className="text-xl md:text-2xl opacity-80"
              style={{ color: 'var(--text-color)' }}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p
              className="text-lg leading-relaxed opacity-70"
              style={{ color: 'var(--text-color)' }}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3
              className="text-sm font-semibold mb-3 uppercase tracking-wider opacity-60"
              style={{ color: 'var(--text-color)' }}
            >
              {texts.technologies}
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'var(--text-color)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.id === 'the-last-key' ? (
                    <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-color)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    >
                    <GitBranch className="w-5 h-5" />
                    {texts.viewOnUnityVC}
                    </a>
                  ) : (
                    <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-color)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    >
                    <GitBranch className="w-5 h-5" />
                    {texts.viewOnGithub}
                    </a>
                  )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.3)',
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  color: 'var(--text-color)',
                }}
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {texts.liveDemo}
              </a>
            )}
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
