import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudy {
  problem: string;
  decision: string;
  result: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  caseStudy?: CaseStudy;
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
  texts: {
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
}

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
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

  const caseRows = project?.caseStudy
    ? ([
        ['problem', texts.caseStudy.problem, project.caseStudy.problem],
        ['decision', texts.caseStudy.decision, project.caseStudy.decision],
        ['result', texts.caseStudy.result, project.caseStudy.result],
      ] as const)
    : [];

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8"
          style={{ backgroundColor: 'rgba(33, 35, 40, 0.92)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-[12px] sm:rounded-(--radius)"
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

              <h2 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h2>
              <p className="text-base md:text-lg opacity-70 mb-6">{project.subtitle}</p>
              <p className="text-[15px] leading-relaxed opacity-60 mb-8">{project.description}</p>

              {caseRows.length > 0 && (
                <div className="mb-8 border-t border-[oklch(94%_0.006_250/0.12)] pt-6 space-y-5">
                  {caseRows.map(([key, label, text]) => (
                    <div key={key}>
                      <p className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-(--accent) mb-1.5">
                        {label}
                      </p>
                      <p className="text-[15px] leading-relaxed opacity-70">{text}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="section-eyebrow mb-3!">{texts.technologies}</p>
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
                >
                  {project.id === 'the-last-key' ? texts.viewOnUnityVC : texts.viewOnGithub}
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link self-center"
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
