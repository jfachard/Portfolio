import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';

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
  return (
    <section
      id="contact"
      className="page-pad py-14 md:py-16 mt-0"
      style={{ background: 'var(--accent)', color: 'var(--bg-color)' }}
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            title={texts.title}
            onTextHover={onTextHover}
            onTextLeave={onTextLeave}
          />
        </motion.div>

        <div className="flex flex-wrap gap-6 md:gap-8 mb-10">
          <a
            href={`mailto:${texts.email}`}
            className="text-[15px] font-semibold opacity-80 hover:opacity-100 transition-opacity"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.email}
          </a>
          <a
            href="https://github.com/jfachard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold opacity-80 hover:opacity-100 transition-opacity"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jeanfrancis-achard/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold opacity-80 hover:opacity-100 transition-opacity"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/jf_achard/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold opacity-80 hover:opacity-100 transition-opacity"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            Instagram
          </a>
        </div>

        <p className="font-mono text-[11px] opacity-50 m-0">{texts.footer}</p>
      </div>
    </section>
  );
};
