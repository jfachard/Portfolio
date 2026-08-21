import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import photosData from '../data/photos.json';
import { SectionHeading } from './SectionHeading';

interface Photo {
  id: string;
  src: string;
  alt: { fr: string; en: string };
  place: string;
  year: string;
}

interface PhotosProps {
  texts: {
    title: string;
    hint: string;
  };
  language: 'fr' | 'en';
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

/** Varied aspect ratios for masonry feel before real images load */
const ASPECTS = ['aspect-4/3', 'aspect-3/4', 'aspect-square', 'aspect-4/5', 'aspect-3/2', 'aspect-5/4'];

export const Photos = ({ texts, language, onTextHover, onTextLeave }: PhotosProps) => {
  const [active, setActive] = useState<Photo | null>(null);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const photos = photosData.photos as Photo[];
  const altOf = (photo: Photo) => photo.alt[language];

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      const i = photos.findIndex((p) => p.id === active.id);
      if (e.key === 'ArrowRight' && i < photos.length - 1) setActive(photos[i + 1]);
      if (e.key === 'ArrowLeft' && i > 0) setActive(photos[i - 1]);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, photos]);

  return (
    <section id="photos" className="page-shell page-pad pb-[var(--section-pad)]">
      <SectionHeading
        title={texts.title}
        onTextHover={onTextHover}
        onTextLeave={onTextLeave}
        aside={
          <p className="font-mono text-[11px] opacity-35 uppercase tracking-[0.08em] hidden sm:block mb-1.5">
            {texts.hint}
          </p>
        }
      />

      <div className="photos-masonry">
        {photos.map((photo, i) => {
          const broken = failed[photo.id];

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActive(photo)}
              className={`group relative w-full overflow-hidden rounded-[var(--radius)] text-left mb-3 sm:mb-4 break-inside-avoid ${ASPECTS[i % ASPECTS.length]}`}
            >
              <div
                className="stripe absolute inset-0"
                style={{
                  ['--s1' as string]: 'rgb(135 179 141 / .22)',
                  ['--s2' as string]: 'rgb(135 179 141 / .08)',
                }}
              />
              {!broken && (
                <img
                  src={photo.src}
                  alt={altOf(photo)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={() => setFailed((prev) => ({ ...prev, [photo.id]: true }))}
                />
              )}
              {broken && (
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] opacity-40 px-4 text-center">
                  {photo.id}.jpg
                </span>
              )}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'linear-gradient(to top, rgb(33 35 40 / 0.75), transparent 45%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[11px] font-semibold tracking-[0.06em] uppercase">
                  {photo.place}
                </span>
                <span className="font-mono text-[11px] opacity-50">{photo.year}</span>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgb(33 35 40 / 0.92)', backdropFilter: 'blur(8px)' }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--surface)' }}
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[75vh] rounded-[var(--radius)] overflow-hidden bg-[var(--bg-color)]">
                {failed[active.id] ? (
                  <div
                    className="stripe aspect-4/3 w-full"
                    style={{
                      ['--s1' as string]: 'rgb(135 179 141 / .22)',
                      ['--s2' as string]: 'rgb(135 179 141 / .08)',
                    }}
                  />
                ) : (
                  <img
                    src={active.src}
                    alt={altOf(active)}
                    className="w-full max-h-[75vh] object-contain"
                  />
                )}
              </div>
              <figcaption className="mt-4 flex items-baseline gap-3 font-mono text-[12px]">
                <span className="font-semibold tracking-[0.06em] uppercase text-[var(--accent)]">
                  {active.place}
                </span>
                <span className="opacity-40">{active.year}</span>
                <span className="opacity-30 hidden sm:inline">— {altOf(active)}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
