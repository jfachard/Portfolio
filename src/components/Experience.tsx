import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';

interface ExperienceProps {
  texts: {
    title: string;
    experiences: Array<{
      company: string;
      position: string;
      period: string;
      location: string;
      description: string[];
      technologies?: string[];
    }>;
  };
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Experience = ({ texts, onTextHover, onTextLeave }: ExperienceProps) => {
  return (
    <section id="experience" className="page-shell page-pad pb-(--section-pad)">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          title={texts.title}
          onTextHover={onTextHover}
          onTextLeave={onTextLeave}
        />
      </motion.div>

      <div className="relative pl-8 max-w-3xl">
        <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-current opacity-20" />

        <div className="flex flex-col gap-7">
          {texts.experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08 }}
              className="relative"
            >
              <div
                className="absolute -left-8 top-1.5 w-[10px] h-[10px] rounded-full"
                style={{
                  background:
                    index === 0 ? 'var(--accent)' : 'rgb(135 179 141 / 0.4)',
                }}
              />

              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <h3
                  className="text-[18px] font-bold leading-none m-0"
                  onMouseEnter={onTextHover}
                  onMouseLeave={onTextLeave}
                >
                  {exp.position} — {exp.company}
                </h3>
                <span className="font-mono text-[12px] font-medium opacity-50">
                  {exp.period}
                </span>
              </div>

              <p className="font-mono text-[11px] opacity-40 mt-2 mb-0">
                {exp.location}
              </p>

              <ul className="m-0 mt-3 pl-3 list-none space-y-1.5 border-l-2 border-dashed border-[oklch(94%_0.006_250/0.3)]">
                {exp.description.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] leading-[1.6] opacity-50"
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tag px-[9px] py-1 rounded-[5px]"
                      style={{ background: 'var(--surface)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
