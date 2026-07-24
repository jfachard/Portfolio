import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
  onTextHover,
  onTextLeave,
  texts,
}: ProjectModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8"
          style={{ backgroundColor: 'rgba(33, 35, 40, 0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-[12px] sm:rounded-[var(--radius)]"
            style={{
              backgroundColor: 'var(--bg-color)',
              border: '1px solid oklch(94% 0.006 250 / .12)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full"
              style={{ background: 'var(--surface)' }}
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full aspect-video overflow-hidden">
              <div
                className="stripe absolute inset-0"
                style={{
                  ['--s1' as string]: 'rgb(135 179 141 / .2)',
                  ['--s2' as string]: 'rgb(135 179 141 / .07)',
                }}
              />
              <img
                src={project.image}
                alt={project.title}
                className="relative w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              {project.featured && (
                <span className="tag opacity-40 mb-3 inline-block">{texts.featuredProject}</span>
              )}

              <h2
                className="text-3xl md:text-4xl font-bold mb-2"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
              >
                {project.title}
              </h2>
              <p
                className="text-base md:text-lg opacity-70 mb-6"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
              >
                {project.subtitle}
              </p>

              <p
                className="text-[15px] leading-relaxed opacity-60 mb-8"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
              >
                {project.description}
              </p>

              <p className="section-eyebrow !mb-3">{texts.technologies}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag px-[9px] py-1 rounded-[5px]"
                    style={{ background: 'var(--surface)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-btn"
                  onMouseEnter={onTextHover}
                  onMouseLeave={onTextLeave}
                >
                  {project.id === 'the-last-key' ? texts.viewOnUnityVC : texts.viewOnGithub}
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link self-center"
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                  >
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
