import { motion } from 'motion/react';
import { NowPlaying } from './NowPlaying';

interface HeroProps {
  texts: {
    role: string;
    status: string;
    firstName: string;
    lastName: string;
    description: string;
    cta: string;
    downloadCv: string;
    nowPlaying: string;
    lastPlayed: string;
  };
  language: 'fr' | 'en';
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

const Portrait = ({ className = '' }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div
      className="absolute inset-0 rounded-[var(--radius)] border border-[var(--accent)]/40"
      style={{ transform: 'translate(10px, 10px)' }}
      aria-hidden
    />
    <div
      className="absolute inset-0 rounded-[var(--radius)] bg-[var(--accent)]/12"
      style={{ transform: 'translate(10px, 10px)' }}
      aria-hidden
    />
    <div
      className="relative w-full h-full rounded-[var(--radius)] overflow-hidden"
      style={{ boxShadow: '0 28px 56px -18px rgb(0 0 0 / 0.6)' }}
    >
      <img
        src="/images/Me.JPG"
        alt="Jean-Francis Achard"
        className="w-full h-full object-cover object-top"
        loading="eager"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgb(33 35 40 / 0.4), transparent 40%)',
        }}
      />
    </div>
  </div>
);

export const Hero = ({ texts, language, onTextHover, onTextLeave }: HeroProps) => {
  return (
    <section id="hero" className="page-shell relative overflow-x-clip">
      <div className="page-pad pt-8 pb-16 md:pt-10 md:pb-20 relative">
        <div className="relative lg:min-h-[420px] xl:min-h-[460px]">
          {/* Desktop only — composition qui chevauche le nom */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.75 }}
            className="hidden lg:block absolute right-0 bottom-2 xl:right-4 z-[1] w-[300px] h-[400px] xl:w-[340px] xl:h-[440px] mr-2.5 mb-2.5 -rotate-2"
          >
            <Portrait className="w-full h-full" />
          </motion.div>

          <motion.div
            key={texts.role}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 lg:max-w-[62%] xl:max-w-[58%]"
          >
            <h1
              className="font-display leading-[0.92] m-0 w-fit"
              style={{ fontSize: 'clamp(3.25rem, 11vw, 7rem)' }}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.firstName}
            </h1>
            <h1
              className="font-display leading-[0.92] m-0 mb-4 md:mb-5 opacity-[0.32] w-fit"
              style={{ fontSize: 'clamp(3.25rem, 11vw, 7rem)' }}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.lastName}
            </h1>

            <p
              className="text-[15px] md:text-[17px] font-medium leading-snug opacity-80 mb-2.5"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.role}
            </p>

            <p
              className="font-mono text-[11px] sm:text-[12px] font-medium tracking-[0.06em] uppercase opacity-45 mb-6 md:mb-8"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.status}
            </p>

            <p
              className="text-[17px] md:text-[19px] leading-[1.6] max-w-[520px] opacity-70 mb-8 md:mb-9"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.description}
            </p>

            <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3">
              <a
                href={language === 'fr' ? '/CV_visual_FR.pdf' : '/CV_EN.pdf'}
                download
                className="cv-btn w-fit"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
              >
                {texts.downloadCv} ↓
              </a>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="https://github.com/jfachard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium opacity-50 hover:opacity-100 transition-opacity"
                  onMouseEnter={onTextHover}
                  onMouseLeave={onTextLeave}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jeanfrancis-achard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium opacity-50 hover:opacity-100 transition-opacity"
                  onMouseEnter={onTextHover}
                  onMouseLeave={onTextLeave}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="now-playing-fixed fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40">
        <NowPlaying texts={{ nowPlaying: texts.nowPlaying, lastPlayed: texts.lastPlayed }} />
      </div>
    </section>
  );
};
