import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';

interface HeroProps {
  texts: {
    role: string;
    firstName: string;
    lastName: string;
    description: string;
    cta: string;
  };
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Hero = ({ texts, onTextHover, onTextLeave }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
      <motion.div
        key={texts.role} 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
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
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none w-fit"
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
          className="text-6xl md:text-8xl lg:text-9xl font-bold opacity-30 mb-12 leading-none w-fit"
          style={{ color: 'var(--text-secondary)' }}
        >
          {texts.lastName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mb-16 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {texts.description}
        </motion.p>

        <div className="flex space-x-4 mb-8">
          <motion.a
            href="https://github.com/jfachard"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="transition-colors"
            style={{
              color: 'var(--text-secondary)',
              '--hover-color': 'var(--accent)'
            } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
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
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <Linkedin size={32} />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button
            onClick={() => {
              const projectsElement = document.getElementById('projects');
              if (projectsElement) {
                projectsElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-3 text-lg md:text-xl font-medium group cursor-pointer"
            style={{ color: 'var(--text-color)' }}
          >
            <span>{texts.cta}</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              style={{ color: 'var(--accent)' }}
            >
              <ArrowDown
                size={24}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="h-px mt-14 max-w-md"
          style={{
            background: 'linear-gradient(to right, rgba(168, 85, 247, 0.5), transparent)'
          }}
        />
      </motion.div>
    </section>
  );
};