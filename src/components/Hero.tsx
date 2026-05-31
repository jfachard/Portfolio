import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Download } from 'lucide-react';
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
  const goToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
      <motion.div
        key={texts.role}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        {/* Left: text content */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs md:text-sm uppercase tracking-widest mb-8 font-mono w-fit"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 leading-none w-fit"
            style={{ color: 'var(--text-color)' }}
          >
            {texts.firstName}
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
            className="text-5xl sm:text-6xl md:text-8xl font-bold opacity-30 mb-8 md:mb-10 leading-none w-fit"
            style={{ color: 'var(--text-secondary)' }}
          >
            {texts.lastName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.description}
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <motion.a
              href="https://github.com/jfachard"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="icon-link"
            >
              <Github size={32} />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/jeanfrancis-achard/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="icon-link"
            >
              <Linkedin size={32} />
            </motion.a>

            <motion.a
              href={`/CV_visual_${language.toUpperCase()}.pdf`}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="cv-btn flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              <Download size={16} />
              {texts.downloadCv}
            </motion.a>

            <motion.a
              href={`/CV_${language.toUpperCase()}.pdf`}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="icon-link text-xs font-medium"
            >
              {texts.downloadCvAts}
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              onClick={goToProjects}
              className="inline-flex items-center gap-3 text-lg md:text-xl font-medium group cursor-pointer"
              style={{ color: 'var(--text-color)' }}
            >
              <span>{texts.cta}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ color: 'var(--accent)' }}
              >
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="h-px mt-10 max-w-md"
            style={{ background: 'linear-gradient(to right, rgba(245, 158, 11, 0.5), transparent)' }}
          />
        </div>

        {/* Right: tilted photo card — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="hidden lg:block shrink-0"
        >
          <div className="relative w-72 h-96">
            {/* Back layers for depth */}
            <div
              className="absolute inset-0 rounded-2xl border border-amber-500/15"
              style={{ transform: 'rotate(10deg) translate(10px, 10px)' }}
            />
            <div
              className="absolute inset-0 rounded-2xl border border-amber-500/25"
              style={{ transform: 'rotate(6deg) translate(6px, 6px)' }}
            />
            {/* Main photo card */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl"
              style={{
                transform: 'rotate(-3deg)',
                boxShadow: '0 25px 60px -10px rgba(245, 158, 11, 0.25)'
              }}
            >
              <img
                src="/images/Me.JPG"
                alt="Jean-Francis Achard"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#111008]/50 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Now Playing Widget */}
      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40">
        <NowPlaying texts={{ nowPlaying: texts.nowPlaying, lastPlayed: texts.lastPlayed }} />
      </div>
    </section>
  );
};
