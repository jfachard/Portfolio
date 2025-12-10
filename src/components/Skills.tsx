import { motion } from 'framer-motion';

interface SkillsProps {
  texts: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      database: string;
      tools: string;
    };
  };
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Skills = ({ texts, onTextHover, onTextLeave }: SkillsProps) => {
  const skills = {
    frontend: ['Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'PrimeVue'],
    backend: ['Node.js', 'Express', 'Socket.io', 'PHP', 'REST API'],
    database: ['MongoDB', 'MySQL'],
    tools: ['Git', 'GitHub', 'Vite', 'npm', 'WebSockets', 'CI/CD'],
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
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex justify-center"
        >
          <h2
            className="text-6xl md:text-8xl font-bold mb-12 text-center"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Frontend */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-2xl font-bold text-[#f1f5f9] mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.frontend}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.frontend.map((skill, index) => (
                <motion.span
                  key={skill}
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
                  className="px-4 py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg 
                           border border-[#475569]/30 font-medium text-sm 
                           transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-2xl font-bold text-[#f1f5f9] mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.backend}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.backend.map((skill, index) => (
                <motion.span
                  key={skill}
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
                  className="px-4 py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg 
                           border border-[#475569]/30 font-medium text-sm 
                           transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Database */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-2xl font-bold text-[#f1f5f9] mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.database}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.database.map((skill, index) => (
                <motion.span
                  key={skill}
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
                  className="px-4 py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg 
                           border border-[#475569]/30 font-medium text-sm 
                           transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3
              className="text-2xl font-bold text-[#f1f5f9] mb-6 w-fit"
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
            >
              {texts.categories.tools}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.tools.map((skill, index) => (
                <motion.span
                  key={skill}
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
                  className="px-4 py-2 bg-[#334155]/50 text-[#cbd5e1] rounded-lg 
                           border border-[#475569]/30 font-medium text-sm 
                           transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};