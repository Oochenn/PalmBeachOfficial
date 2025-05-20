'use client';

import './globals.css';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { LanguageProvider, useLanguageContext } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useScroll } from '@/hooks/use-scroll';

function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguageContext();
  const t = translations[language];
  const hidden = useScroll();
  
  const languages = {
    EN: 'English',
    FR: 'Français',
    NL: 'Nederlands',
    DE: 'Deutsch'
  };

  const handleLanguageChange = (lang: keyof typeof languages) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl text-white"></div>
          <div className="flex items-center space-x-8 text-white">
            <div className="relative">
              <button 
                className="flex items-center space-x-1 hover:text-gray-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Globe size={20} />
                <span>{language}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-40 backdrop-blur-md bg-white/10 rounded-lg shadow-xl border border-white/20">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code as keyof typeof languages)}
                      className="block w-full px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors text-left"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/abuget" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Navigation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}