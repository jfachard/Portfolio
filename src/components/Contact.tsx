import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUp, Instagram } from 'lucide-react';

interface ContactProps {
  texts: {
    title: string;
    email: string;
    emailLabel: string;
    socialLabel: string;
    backToTop: string;
    footer: string;
  };
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Contact = ({ texts, onTextHover, onTextLeave }: ContactProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="flex items-center justify-center px-6 py-16 md:py-20 pb-28 md:pb-20">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#f5f0e8] mb-8 w-fit"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.title}
          </motion.h2>
          
          {/* Ligne horizontale */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-linear-to-r from-[#f59e0b] via-[#f59e0b]/50 to-transparent"
          />
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20"
        >
          {/* Email */}
          <div>
            <p className="text-[#9c9488] uppercase tracking-wider text-sm font-mono mb-4">
              {texts.emailLabel}
            </p>
            <motion.a
              href={`mailto:${texts.email}`}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-[#f5f0e8] text-xl md:text-2xl 
                       hover:text-[#f59e0b] transition-colors group w-fit break-all md:break-normal"
            >
              <Mail size={24} className="text-[#f59e0b]" />
              <span className="font-medium">{texts.email}</span>
            </motion.a>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-[#9c9488] uppercase tracking-wider text-sm font-mono mb-4">
              {texts.socialLabel}
            </p>
            <div className="flex flex-col gap-4">
              <motion.a
                href="https://github.com/jfachard"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-[#f5f0e8] text-xl md:text-2xl 
                         hover:text-[#f59e0b] transition-colors group w-fit break-all md:break-normal"
              >
                <Github size={24} className="text-[#f59e0b]" />
                <span className="font-medium">GitHub</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/jeanfrancis-achard/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-[#f5f0e8] text-xl md:text-2xl 
                         hover:text-[#f59e0b] transition-colors group w-fit break-all md:break-normal"
              >
                <Linkedin size={24} className="text-[#f59e0b]" />
                <span className="font-medium">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/jf_achard/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-[#f5f0e8] text-xl md:text-2xl 
                         hover:text-[#f59e0b] transition-colors group w-fit break-all md:break-normal"
              >
                <Instagram size={24} className="text-[#f59e0b]" />
                <span className="font-medium">Instagram</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 text-[#9c9488] hover:text-[#f59e0b] 
                     transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#3d3628] 
                          group-hover:border-[#f59e0b] flex items-center justify-center 
                          transition-colors">
              <ArrowUp size={20} />
            </div>
            <span className="text-sm font-mono uppercase tracking-wider">
              {texts.backToTop}
            </span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 md:mt-20 text-center"
        >
          <p className="text-[#9c9488] text-sm font-mono">
            {texts.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};