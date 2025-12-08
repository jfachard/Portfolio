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
}: LanguageSwitcherProps) => {
  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 transition-colors font-mono text-xl cursor-pointer mix-blend-difference"
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
    >
      {currentLanguage === 'fr' ? 'EN' : 'FR'}
    </button>
  );
};