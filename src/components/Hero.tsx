import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
        // On ajoute une clé unique basée sur le rôle pour forcer le re-render de l'animation lors du changement de langue
        key={texts.role} 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        {/* Small intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs md:text-sm uppercase tracking-widest text-[#8892b0] mb-8 font-mono w-fit"
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
        >
          {texts.role}
        </motion.p>

        {/* Big name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#edf0f5] mb-4 leading-none w-fit"
        >
          {texts.firstName}
        </motion.h1>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onMouseEnter={onTextHover}
          onMouseLeave={onTextLeave}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#8892b0]/30 mb-12 leading-none w-fit"
        >
          {texts.lastName}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-[#8892b0] max-w-2xl mb-16 leading-relaxed"
        >
          {texts.description}
        </motion.p>

        {/* CTA simple avec flèche animée - PAS DE HOVER SUR LE CURSEUR ICI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-3 text-lg md:text-xl font-medium text-[#edf0f5] group"
          >
            <span>{texts.cta}</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="text-[#64ffda]"
            >
              <ArrowRight 
                size={24} 
                className="group-hover:translate-x-2 transition-transform duration-300" 
              />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Ligne décorative minimaliste */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="h-px bg-linear-to-r from-[#64ffda]/50 to-transparent mt-20 max-w-md"
        />
      </motion.div>
    </section>
  );
};