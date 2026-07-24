import { useState } from 'react';

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
  index: number;
  variant?: 'hero' | 'compact';
  onClick: () => void;
  featuredText: string;
  liveDemoText?: string;
}

export const ProjectCard = ({
  project,
  index,
  variant = 'compact',
  onClick,
  featuredText,
  liveDemoText,
}: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const number = String(index + 1).padStart(2, '0');

  if (variant === 'hero') {
    return (
      <article
        className="group cursor-pointer mb-2 md:mb-4"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="relative aspect-16/10 sm:aspect-2/1 md:aspect-2.4/1 max-h-[280px] md:max-h-[340px] w-full rounded-(--radius) overflow-hidden mb-4 md:mb-5">
          <div
            className={`stripe absolute inset-0 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              ['--s1' as string]: 'rgb(135 179 141 / .2)',
              ['--s2' as string]: 'rgb(135 179 141 / .07)',
            }}
          />
          <img
            src={project.image}
            alt={project.title}
            loading="eager"
            className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgb(33 35 40 / 0.5), transparent 40%)',
            }}
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="min-w-0 max-w-2xl">
            <span className="font-mono text-[11px] font-semibold tracking-[0.08em] text-(--accent) block mb-2.5">
              {number} — {featuredText}
            </span>
            <h3 className="font-display text-[clamp(1.75rem,6vw,2.75rem)] leading-[0.95] m-0 mb-2.5 group-hover:text-(--accent) transition-colors">
              {project.title}
            </h3>
            <p className="text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[1.4] opacity-70 m-0 mb-2">
              {project.subtitle}
            </p>
            <p className="text-[13px] leading-[1.55] opacity-45 m-0 line-clamp-3 sm:line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 md:items-end">
            <div className="flex gap-2 flex-wrap md:justify-end">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="tag px-[9px] py-1 rounded-[5px]"
                  style={{ background: 'var(--surface)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.demoUrl && liveDemoText && (
              <span className="text-link w-fit text-[13px] opacity-80 group-hover:opacity-100">
                {liveDemoText} →
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-3 sm:gap-x-5 gap-y-1.5 items-start sm:items-center py-4 sm:py-5 border-b border-[oklch(94%_0.006_250/0.12)] cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className="font-mono text-[11px] sm:text-[12px] font-semibold tracking-[0.08em] opacity-35 group-hover:opacity-100 group-hover:text-(--accent) transition-all pt-0.5 sm:pt-0">
        {number}
      </span>

      <div className="min-w-0">
        <h3 className="text-[15px] sm:text-[17px] font-bold leading-snug m-0 group-hover:text-(--accent) transition-colors">
          {project.title}
        </h3>
        <p className="text-[12px] sm:text-[13px] opacity-45 m-0 mt-1 line-clamp-2 sm:line-clamp-1">
          {project.subtitle}
        </p>
        <div className="flex gap-1.5 flex-wrap mt-2 sm:hidden">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="tag px-2 py-0.5 rounded-[5px] opacity-70"
              style={{ background: 'var(--surface)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden sm:flex gap-1.5 flex-wrap justify-end max-w-[240px] lg:max-w-[280px]">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="tag px-2 py-0.5 rounded-[5px] opacity-70"
            style={{ background: 'var(--surface)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
