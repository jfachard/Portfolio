import React from 'react';

interface LanguageSwitcherProps {
  currentLanguage: 'fr' | 'en';
  toggleLanguage: () => void;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

export const LanguageSwitcher = ({ 
  currentLanguage, 
  toggleLanguage, 
  onMouseEnter, 
  onMouseLeave 
}: LanguageSwitcherProps) => {
  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-xl cursor-pointer mix-blend-difference"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {currentLanguage === 'fr' ? 'EN' : 'FR'}
    </button>
  );
};