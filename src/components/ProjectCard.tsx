import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  imageFit?: 'cover' | 'contain';
  imageAspect?: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  liveDemoText?: string;
}

export const ProjectCard = ({
  project,
  index,
  onClick,
  liveDemoText,
}: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const exact = !!project.imageAspect;
  const contain = !exact && project.imageFit === 'contain';

  return (
    <article
      className="group cursor-pointer flex flex-col gap-4 md:gap-5"
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
      <div
        className={`relative w-full rounded-(--radius) overflow-hidden ${exact ? '' : 'aspect-16/10'}`}
        style={{
          background: 'var(--surface)',
          ...(exact ? { aspectRatio: project.imageAspect } : {}),
        }}
      >
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
          loading={index < 2 ? 'eager' : 'lazy'}
          className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.03] ${
            exact
              ? 'object-cover'
              : contain
                ? 'object-contain p-7 sm:p-9 md:p-10'
                : 'object-cover object-[center_18%]'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        {!contain && !exact && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgb(33 35 40 / 0.45), transparent 42%)',
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 min-w-0">
        <h3 className="font-display text-[clamp(1.35rem,2.8vw,1.85rem)] leading-[1.1] m-0 group-hover:text-(--accent) transition-colors">
          {project.title}
        </h3>
        <p className="text-[14px] md:text-[15px] font-medium leading-[1.45] opacity-65 m-0">
          {project.subtitle}
        </p>
        <p className="text-[13px] leading-[1.55] opacity-40 m-0 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between gap-3 mt-1">
          <div className="flex gap-1.5 flex-wrap min-w-0">
            {project.tags.slice(0, 3).map((tag) => (
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
            <span className="text-link shrink-0 text-[12px] opacity-70 group-hover:opacity-100">
              {liveDemoText} →
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
