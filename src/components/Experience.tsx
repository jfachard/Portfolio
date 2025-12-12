import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
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

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent" />

          {/* Experience items */}
          <div className="space-y-12">
            {texts.experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-[-8px] md:left-[24px] top-2 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0f172a]" />

                {/* Card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(51, 65, 85, 0.6)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#334155]/40 backdrop-blur-sm rounded-lg p-6 border border-[#475569]/30"
                >
                  {/* Company & Position */}
                  <div className="mb-4">
                    <h3
                      className="text-2xl font-bold text-[#f1f5f9] mb-2 flex items-center gap-2 w-fit"
                      onMouseEnter={onTextHover}
                      onMouseLeave={onTextLeave}
                    >
                      <Briefcase size={24} className="text-purple-400" />
                      {exp.position}
                    </h3>
                    <p
                      className="text-xl text-purple-400 font-medium w-fit"
                      onMouseEnter={onTextHover}
                      onMouseLeave={onTextLeave}
                    >
                      {exp.company}
                    </p>
                  </div>

                  {/* Period & Location */}
                  <div className="flex flex-wrap gap-4 mb-4 text-[#94a3b8] text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4 text-[#cbd5e1]">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1.5">"</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-md 
                                    text-xs font-medium border border-purple-500/20"
                        >
                            {tech}
                        </span>
                        ))}
                    </div>
                    )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};