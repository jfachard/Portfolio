import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';

interface SkillsProps {
  texts: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      database: string;
      tools: string;
      infra: string;
    };
  };
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

const SKILL_GROUPS = [
  {
    key: 'frontend' as const,
    items: 'Vue.js, React, React Native, TypeScript, Tailwind CSS, Pinia, Vite, Expo, PrimeVue',
  },
  {
    key: 'backend' as const,
    items: 'NestJS, Node.js, Express, Socket.io, REST, JWT',
  },
  {
    key: 'database' as const,
    items: 'PostgreSQL, Prisma, MongoDB, MySQL',
  },
  {
    key: 'tools' as const,
    items: 'Git, Docker, Figma, CI/CD, Railway, Vercel',
  },
];

export const Skills = ({ texts, onTextHover, onTextLeave }: SkillsProps) => {
  const labels: Record<(typeof SKILL_GROUPS)[number]['key'], string> = {
    frontend: texts.categories.frontend,
    backend: texts.categories.backend,
    database: texts.categories.database,
    tools: texts.categories.tools,
  };

  return (
    <section id="skills" className="page-shell page-pad pb-12 md:pb-16">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILL_GROUPS.map((group, i) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <h3
              className="text-[13px] font-bold uppercase tracking-[0.04em] m-0 mb-3.5 opacity-50"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {labels[group.key]}
            </h3>
            <p
              className="text-[15px] leading-[1.9] m-0"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {group.items}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
