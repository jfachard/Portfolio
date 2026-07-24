import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  texts: {
    home: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
  };
  currentLanguage: 'fr' | 'en';
  toggleLanguage: () => void;
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const Navigation = ({
  texts,
  currentLanguage,
  toggleLanguage,
  onTextHover,
  onTextLeave,
}: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'experience', 'skills', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0, rootMargin: '-12% 0px -72% 0px' }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const navItems = [
    { id: 'projects', label: texts.projects },
    { id: 'experience', label: texts.experience },
    { id: 'skills', label: texts.skills },
    { id: 'contact', label: texts.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="page-shell page-pad relative z-60 flex items-center justify-end pt-5 md:pt-6">
        <div className="flex items-center gap-5 md:gap-8">
          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
                className={`text-[13px] font-medium uppercase tracking-[0.08em] transition-opacity ${
                  activeSection === item.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div
            className="flex items-center gap-0 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase rounded-full border border-[oklch(94%_0.006_250/0.18)] p-0.5"
            role="group"
            aria-label="Language"
          >
            <button
              onClick={() => currentLanguage !== 'fr' && toggleLanguage()}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                currentLanguage === 'fr'
                  ? 'bg-(--accent) text-(--bg-color)'
                  : 'opacity-45 hover:opacity-80'
              }`}
              aria-pressed={currentLanguage === 'fr'}
            >
              FR
            </button>
            <button
              onClick={() => currentLanguage !== 'en' && toggleLanguage()}
              onMouseEnter={onTextHover}
              onMouseLeave={onTextLeave}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                currentLanguage === 'en'
                  ? 'bg-(--accent) text-(--bg-color)'
                  : 'opacity-45 hover:opacity-80'
              }`}
              aria-pressed={currentLanguage === 'en'}
            >
              EN
            </button>
          </div>

          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-5 bg-(--text-color) transition-transform origin-center ${
                menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-(--text-color) transition-transform origin-center ${
                menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-(--bg-color) md:hidden flex flex-col justify-center px-8 gap-8"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={onTextHover}
                onMouseLeave={onTextLeave}
                className="text-left"
              >
                <span className="font-mono text-[11px] opacity-40 mr-3">0{i + 2}</span>
                <span className="font-display text-5xl">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
