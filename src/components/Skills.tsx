import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Database,
  GitBranch,
  Github,
  Workflow
} from 'lucide-react';

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

export const Skills = ({ texts, onTextHover, onTextLeave }: SkillsProps) => {
  const skills = {
    frontend: [
      { name: 'Vue.js', icon: Code2 },
      { name: 'React', icon: Code2 },
      { name: 'React Native', icon: Code2 },
      { name: 'TypeScript', icon: Code2 },
      { name: 'JavaScript', icon: Code2 },
      { name: 'HTML/CSS', icon: Code2 },
      { name: 'Tailwind CSS', icon: Code2 },
      { name: 'PrimeVue', icon: Code2 },
      { name: 'Pinia', icon: Code2 },
      { name: 'Vite', icon: Code2 },
      { name: 'Expo', icon: Code2 },
    ],
    backend: [
      { name: 'NestJS', icon: Server },
      { name: 'Node.js', icon: Server },
      { name: 'Express', icon: Server },
      { name: 'Socket.io', icon: Server },
      { name: 'REST API', icon: Server },
      { name: 'JWT', icon: Server },
      { name: 'PHP', icon: Server },
    ],
    database: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'Prisma', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'MySQL', icon: Database },
    ],
    tools: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: Github },
      { name: 'Docker', icon: Workflow },
      { name: 'Figma', icon: Workflow },
    ],
    infra:[
      { name: 'CI/CD', icon: Workflow },
      { name: 'Railway', icon: Workflow },
      { name: 'Vercel', icon: Workflow },
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="flex flex-col items-center justify-center px-6 py-16 md:py-20">
      <div className="max-w-7xl w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-14 flex justify-center"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-8xl font-bold mb-4 md:mb-12 text-center"
            onMouseEnter={onTextHover}
            onMouseLeave={onTextLeave}
          >
            {texts.title}
          </h2>
        </motion.div>

        {/* Grid des catégories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Frontend */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-lg md:text-2xl font-bold text-[#f1f5f9] mb-4 md:mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.frontend}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.frontend.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg
                             border border-[#475569]/30 font-medium text-xs md:text-sm
                             transition-colors cursor-default flex items-center gap-1.5 md:gap-2"
                  >
                    <Icon size={16} />
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-lg md:text-2xl font-bold text-[#f1f5f9] mb-4 md:mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.backend}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.backend.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg
                             border border-[#475569]/30 font-medium text-xs md:text-sm
                             transition-colors cursor-default flex items-center gap-1.5 md:gap-2"
                  >
                    <Icon size={16} />
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Database */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-lg md:text-2xl font-bold text-[#f1f5f9] mb-4 md:mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.database}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.database.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg
                             border border-[#475569]/30 font-medium text-xs md:text-sm
                             transition-colors cursor-default flex items-center gap-1.5 md:gap-2"
                  >
                    <Icon size={16} />
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-lg md:text-2xl font-bold text-[#f1f5f9] mb-4 md:mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.tools}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.tools.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg
                             border border-[#475569]/30 font-medium text-xs md:text-sm
                             transition-colors cursor-default flex items-center gap-1.5 md:gap-2"
                  >
                    <Icon size={16} />
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-lg md:text-2xl font-bold text-[#f1f5f9] mb-4 md:mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.infra}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.infra.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      borderColor: 'rgba(168, 85, 247, 0.5)',
                    }}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg
                             border border-[#475569]/30 font-medium text-xs md:text-sm
                             transition-colors cursor-default flex items-center gap-1.5 md:gap-2"
                  >
                    <Icon size={16} />
                    {skill.name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};