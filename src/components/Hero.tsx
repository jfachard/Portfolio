import { motion } from 'motion/react';
import { NowPlaying } from './NowPlaying';

interface HeroProps {
  texts: {
    role: string;
    firstName: string;
    lastName: string;
    description: string;
    cta: string;
    downloadCv: string;
    downloadCvAts: string;
    nowPlaying: string;
    lastPlayed: string;
  };
  language: 'fr' | 'en';
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Hero = ({ texts, language, onTextHover, onTextLeave }: HeroProps) => {
  return (
    <section id="hero" className="page-shell relative overflow-x-clip">
      <div className="page-pad pt-8 pb-16 md:pt-10 md:pb-20 flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-end relative">
        <motion.div
          key={texts.role}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 min-w-0 relative z-10"
        >
          <p
            className="section-eyebrow mb-5 md:mb-7"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.role}
          </p>

          <h1
            className="font-display leading-[0.92] m-0 w-fit"
            style={{ fontSize: 'clamp(3.25rem, 11vw, 7rem)' }}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.firstName}
          </h1>
          <h1
            className="font-display leading-[0.92] m-0 mb-7 md:mb-8 opacity-[0.32] w-fit"
            style={{ fontSize: 'clamp(3.25rem, 11vw, 7rem)' }}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.lastName}
          </h1>

          <p
            className="text-[17px] md:text-[19px] leading-[1.6] max-w-[520px] opacity-70 mb-8 md:mb-9"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 md:gap-7">
            <a
              href="https://github.com/jfachard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jeanfrancis-achard/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              LinkedIn
            </a>
            <a
              href={`/CV_visual_${language.toUpperCase()}.pdf`}
              download
              className="cv-btn"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.downloadCv} ↓
            </a>
            <a
              href={`/CV_${language.toUpperCase()}.pdf`}
              download
              className="text-[12px] font-medium opacity-45 hover:opacity-80 transition-opacity"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.downloadCvAts}
            </a>
          </div>
        </motion.div>

        {/* Photo — cadre sage offset, sans stripe placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.75 }}
          className="relative shrink-0 self-center lg:self-end w-[200px] h-[260px] sm:w-[240px] sm:h-[310px] lg:w-[300px] lg:h-[390px] xl:w-[320px] xl:h-[420px] mb-2.5 mr-2.5"
        >
          {/* cadre arrière */}
          <div
            className="absolute inset-0 rounded-(--radius) border border-(--accent)/35"
            style={{ transform: 'translate(10px, 10px)' }}
            aria-hidden
          />
          {/* accent plein léger */}
          <div
            className="absolute inset-0 rounded-(--radius) bg-(--accent)/10"
            style={{ transform: 'translate(10px, 10px)' }}
            aria-hidden
          />

          <div
            className="relative w-full h-full rounded-(--radius) overflow-hidden"
            style={{
              boxShadow: '0 24px 48px -20px rgb(0 0 0 / 0.55)',
            }}
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
                background:
                  'linear-gradient(to top, rgb(33 35 40 / 0.35), transparent 35%)',
              }}
            />
          </div>
        </motion.div>
      </div>

      <div className="now-playing-fixed fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40">
        <NowPlaying texts={{ nowPlaying: texts.nowPlaying, lastPlayed: texts.lastPlayed }} />
      </div>
    </section>
  );
};
