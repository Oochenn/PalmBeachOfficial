'use client';

import { ChevronDown, MapPin, Phone, Clock, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { translations } from '@/lib/translations';
import { useLanguageContext } from '@/lib/language-context';
import { useEffect, useState } from 'react';

export default function Home() {
  const { language, setLanguage } = useLanguageContext();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = {
    EN: 'English',
    FR: 'Français',
    NL: 'Nederlands',
    DE: 'Deutsch'
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Rue+Zenobe+Gramme+1+4300+Waremme+Belgique', '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:019331203';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLanguageChange = (lang: keyof typeof languages) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const menuCategories = [
    'burgers',
    'hotdogs',
    'philly',
    'kids',
    'mac',
    'appetizers',
    'drinks',
    'supplements',
    'sauces'
  ] as const;

  const singleColumnCategories = ['kids', 'mac', 'appetizers', 'drinks', 'supplements', 'sauces'];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center bg-gradient-to-br from-[#ff1b6b] to-[#45caff]">
        <div className="relative text-center text-white z-10 space-y-6 animate-bounce-in">
          <h1 className="text-6xl" style={{ fontFamily: 'Abuget' }}>{t.hero.title}</h1>
          <p className="text-3xl" style={{ fontFamily: 'Abuget' }}>{t.hero.subtitle}</p>
          <Button 
            variant="outline" 
            className="border-white text-white bg-transparent hover:bg-white/20"
            onClick={toggleMenu}
          >
            {t.hero.cta}
          </Button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-float">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-slide-down"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(255, 0, 128, 0.3) 0%,
                rgba(0, 255, 255, 0.3) 100%
              ),
              radial-gradient(
                circle at center,
                rgba(0, 0, 0, 0.1) 0%,
                rgba(0, 0, 0, 0.5) 100%
              )
            `,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <div className="absolute top-6 right-6 flex items-center space-x-6">
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors"
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
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 p-2 h-auto"
              onClick={toggleMenu}
            >
              <X size={24} />
            </Button>
          </div>
          <div className="max-w-4xl w-full mx-auto px-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
            <h2 className="text-4xl text-white mb-12 text-center animate-bounce-in" style={{ fontFamily: 'Abuget' }}>{t.menu.title}</h2>
            <div className="grid md:grid-cols-1 gap-12">
              {menuCategories.map((category) => (
                <div key={category} className="opacity-0 animate-fade-in-1">
                  <h3 className="text-2xl text-white mb-6 font-light">{t.menu.categories[category].title}</h3>
                  <div className="space-y-4">
                    {singleColumnCategories.includes(category) ? (
                      // Single column layout
                      <div className="space-y-4">
                        {Object.entries(t.menu.categories[category].items).map(([key, item]) => (
                          <div 
                            key={key} 
                            className="grid grid-cols-12 text-white items-start"
                          >
                            <div className="col-span-9">
                              <h4 className="text-lg">{item.name}</h4>
                              <p className="text-sm text-white/70">{item.description}</p>
                            </div>
                            <div className="col-span-3 text-right text-lg">{item.price}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Regular menu layout with two columns
                      <>
                        <div className="grid grid-cols-12 text-white text-sm uppercase tracking-wider mb-2">
                          <div className="col-span-6"></div>
                          <div className="col-span-3 text-right">Menu</div>
                          <div className="col-span-3 text-right">Single</div>
                        </div>
                        {Object.entries(t.menu.categories[category].items).map(([key, item]) => (
                          <div 
                            key={key} 
                            className="grid grid-cols-12 text-white items-start"
                          >
                            <div className="col-span-6">
                              <h4 className="text-lg">{item.name}</h4>
                              <p className="text-sm text-white/70">{item.description}</p>
                            </div>
                            <div className="col-span-3 text-right text-lg">{item.price}</div>
                            <div className="col-span-3 text-right text-lg">{item?.single ? item.single : item.price}</div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about-section" className="py-20 px-4 bg-white">
        <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div>
            <h2 className="text-4xl mb-6" style={{ fontFamily: 'Abuget' }}>{t.about.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{t.about.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <h2 className="text-4xl col-span-2 text-center mb-6" style={{ fontFamily: 'Abuget' }}>{t.about?.delicious?.title || t.about.title}</h2>
            <p className="text-gray-600 leading-relaxed col-span-2 text-center">
              {t.about?.delicious?.description || t.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              className="p-6 text-center cursor-pointer opacity-0 animate-fade-in-1 hover:scale-105 transition-transform duration-300" 
              onClick={handleLocationClick}
            >
              <MapPin className="mx-auto mb-4" size={24} />
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'Abuget' }}>{t.features.location.title}</h3>
              <p className="text-gray-600 hover:text-primary transition-colors">{t.features.location.address}</p>
            </Card>
            <Card className="p-6 text-center opacity-0 animate-fade-in-2 hover:scale-105 transition-transform duration-300">
              <Clock className="mx-auto mb-4" size={24} />
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'Abuget' }}>{t.features.hours.title}</h3>
              <p className="text-gray-600">{t.features.hours.schedule}</p>
            </Card>
            <Card 
              className="p-6 text-center cursor-pointer opacity-0 animate-fade-in-3 hover:scale-105 transition-transform duration-300" 
              onClick={handlePhoneClick}
            >
              <Phone className="mx-auto mb-4" size={24} />
              <h3 className="text-3xl mb-2" style={{ fontFamily: 'Abuget' }}>{t.features.contact.title}</h3>
              <p className="text-gray-600 hover:text-primary transition-colors">{t.features.contact.info}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-3 items-center">
          <div className="text-sm">
            <p>&copy; 2025 Palm Beach. All rights reserved.</p>
          </div>
          <div className="text-center">
            <a 
              href="https://github.com/Oochenn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              Made with ❤️ by Oochenn 🐺
            </a>
          </div>
          <div className="flex justify-end space-x-6">
            <a href="https://www.instagram.com/palmbeach.off/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors transform hover:scale-110">
              <svg viewBox="0 0 551.034 551.034" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current">
                <path d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.034 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z"/>
                <path d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z"/>
                <circle cx="418.31" cy="134.07" r="34.15"/>
              </svg>
            </a>
            <a href="https://www.snapchat.com/add/palmbeach.off" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors transform hover:scale-110">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current">
                <path d="M203 414c-18-13-32-20-66-14-5 1-14 4-15-5-2-7-2-18-7-19-31-4-42-10-47-16-2-2-3-7 1-8 53-10 78-61 83-71 6-15-4-24-23-30-9-3-24-7-24-17 0-5 5-8 10-10 4-1 8-2 12 0 12 5 23 7 29 2 0-27-7-61 4-89 13-31 45-59 96-59s83 28 96 59c11 28 4 62 4 89 6 5 17 3 29-2 4-2 8-1 12 0 5 2 10 5 10 10 0 10-15 14-24 17-19 6-29 15-23 30 5 10 30 61 83 71 4 1 3 6 1 8-5 6-16 12-47 16-5 1-5 12-7 19-1 9-10 6-15 5-34-6-48 1-66 14a82 82 0 0 1-53 20c-21 1-38-8-53-20z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@palmbeach.off" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors transform hover:scale-110">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current">
                <path d="M237 215C213.362 211.737 189.291 215.781 168.015 226.588C146.74 237.395 129.278 254.449 117.972 275.463C106.665 296.477 102.054 320.445 104.757 344.154C107.46 367.863 117.348 390.179 133.094 408.109C148.841 426.038 169.694 438.724 192.855 444.465C216.017 450.206 240.38 448.727 262.678 440.228C284.975 431.728 304.141 416.614 317.604 396.912C331.067 377.21 338.184 353.862 338 330V202C363.659 220.355 394.452 230.153 426 230V167C402.661 167 380.278 157.729 363.775 141.225C347.271 124.722 338 102.339 338 79H274V331C274.054 342.428 270.48 353.579 263.794 362.848C257.108 372.116 247.653 379.024 236.791 382.578C225.929 386.131 214.219 386.147 203.348 382.623C192.476 379.098 183.003 372.215 176.292 362.965C169.581 353.714 165.977 342.573 166.001 331.144C166.024 319.716 169.673 308.589 176.422 299.366C183.17 290.143 192.672 283.299 203.557 279.819C214.443 276.339 226.153 276.402 237 280"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}