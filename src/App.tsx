import { useState } from 'react'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './index.css'
import translations from '../language.json';

function App() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const t = translations[language];

  const [cursorState, setCursorState] = useState<{ variant: 'default' | 'text', height: number }>({ 
    variant: 'default', 
    height: 0 
  });

  const handleTextHover = (e: React.MouseEvent<HTMLElement>) => {
    const style = window.getComputedStyle(e.currentTarget);
    const fontSize = parseFloat(style.fontSize);
    
    setCursorState({ 
      variant: 'text', 
      height: fontSize * 1.2 
    });
  };

  const handleTextLeave = () => {
    setCursorState({ variant: 'default', height: 0 });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <Cursor variant={cursorState.variant} height={cursorState.height} />

      <LanguageSwitcher 
        currentLanguage={language}
        toggleLanguage={toggleLanguage}
        onMouseEnter={handleTextHover}
        onMouseLeave={handleTextLeave}
      />

      <Hero 
        texts={t.hero}
        onTextHover={handleTextHover}
        onTextLeave={handleTextLeave}
      />

      <Projects
        texts={t.projects}
        language={language}
        onTextHover={handleTextHover}
        onTextLeave={handleTextLeave}
      />
    </>
  )
}

export default App
