import { useState } from 'react';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Navigation } from './components/Navigation';
import { Contact } from './components/Contact';
import { Photos } from './components/Photos';
import './index.css';
import translations from '../language.json';

function App() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const t = translations[language];

  const [cursorState, setCursorState] = useState<{
    variant: 'default' | 'text';
    height: number;
  }>({
    variant: 'default',
    height: 0,
  });

  const handleTextHover = (e: React.MouseEvent<HTMLElement>) => {
    const style = window.getComputedStyle(e.currentTarget);
    const fontSize = parseFloat(style.fontSize);
    setCursorState({
      variant: 'text',
      height: fontSize * 1.2,
    });
  };

  const handleTextLeave = () => {
    setCursorState({ variant: 'default', height: 0 });
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));
  };

  return (
    <>
      <Cursor variant={cursorState.variant} height={cursorState.height} />

      <Navigation
        texts={t.navigation}
        currentLanguage={language}
        toggleLanguage={toggleLanguage}
        onTextHover={handleTextHover}
        onTextLeave={handleTextLeave}
      />

      <main>
        <Hero
          texts={t.hero}
          language={language}
          onTextHover={handleTextHover}
          onTextLeave={handleTextLeave}
        />

        <Projects
          texts={t.projects}
          language={language}
          onTextHover={handleTextHover}
          onTextLeave={handleTextLeave}
        />

        <Experience
          texts={t.experience}
          onTextHover={handleTextHover}
          onTextLeave={handleTextLeave}
        />

        <Skills
          texts={t.skills}
          onTextHover={handleTextHover}
          onTextLeave={handleTextLeave}
        />

        <Photos
          texts={t.photos}
          language={language}
          onTextHover={handleTextHover}
          onTextLeave={handleTextLeave}
        />

        <Contact
          texts={t.contact}
          onTextHover={handleTextHover}
          onTextLeave={handleTextLeave}
        />
      </main>
    </>
  );
}

export default App;
