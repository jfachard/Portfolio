import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, FolderGit2, Award, Briefcase, Mail } from 'lucide-react';

interface NavigationProps {
  texts: {
    home: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Navigation = ({ texts, onTextHover, onTextLeave }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'skills', 'experience', 'contact'];
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const navItems = [
    { id: 'hero', label: texts.home, number: '01', icon: Home },
    { id: 'projects', label: texts.projects, number: '02', icon: FolderGit2 },
    { id: 'skills', label: texts.skills, number: '03', icon: Award },
    { id: 'experience', label: texts.experience, number: '04', icon: Briefcase },
    { id: 'contact', label: texts.contact, number: '05', icon: Mail }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation - Latérale gauche */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed left-12 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        {/* Ligne verticale */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent 
                      via-[#a855f7]/50 to-transparent" />
        
        <ul className="flex flex-col gap-12 relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="relative"
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={onTextHover}
                  onMouseLeave={onTextLeave}
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-4"
                >
                  {/* Numéro */}
                  <span className="text-[#a855f7] font-mono text-sm font-bold w-10 text-right">
                    {item.number}
                  </span>

                  {/* Icône sur la ligne */}
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <Icon
                      size={18}
                      className={`transition-all duration-300 group-hover:scale-110
                               ${activeSection === item.id ? 'text-[#a855f7]' : 'text-[#94a3b8] group-hover:text-[#a855f7]'}`}
                    />
                  </div>

                  {/* Label qui apparaît au hover */}
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    className={`text-sm font-medium whitespace-nowrap overflow-hidden
                             opacity-0 group-hover:opacity-100 group-hover:w-auto transition-all
                             duration-300 group-hover:text-[#a855f7]
                             ${activeSection === item.id ? 'text-[#a855f7]' : 'text-[#cbd5e1]'}`}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Mobile Navigation - Bottom Fixed */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden"
      >
        <div className="bg-[#1e293b]/90 backdrop-blur-lg rounded-full px-4 py-3 
                      border border-[#475569]/30 shadow-lg shadow-black/20">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={onTextHover}
                    onMouseLeave={onTextLeave}
                    whileTap={{ scale: 0.9 }}
                    className={`relative p-3 rounded-full transition-colors group
                               ${activeSection === item.id ? 'bg-[#334155]/70' : 'hover:bg-[#334155]/50'}`}
                  >
                    <Icon
                      size={20}
                      className={`transition-colors ${activeSection === item.id ? 'text-[#a855f7]' : 'text-[#94a3b8] group-hover:text-[#a855f7]'}`}
                    />
                    <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full
                                   text-white text-xs font-mono font-bold flex items-center
                                   justify-center transition-colors
                                   ${activeSection === item.id ? 'bg-[#a855f7]' : 'bg-[#475569]'}`}>
                      {item.number.replace('0', '')}
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};