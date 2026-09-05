import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header = ({ activeSection, setActiveSection }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'InÃ¡cio' },
    { id: 'areas', label: 'Ã¡reas de AtuaÃ§Ã£o' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'blog', label: 'Blog' },
    { id: 'contato', label: 'Contato' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('inicio')}
            className="flex items-center gap-3 group"
            aria-label="Ir para inÃ¡cio"
          >
            <img
              src="/assets/logo-9rpGI4jg.png"
              alt="Lisomar Barbosa Advocacia"
              className="h-24 lg:h-24 md:h-32 sm:h-32 w-auto transition-smooth group-hover:scale-105"
              width={96}
              height={96}
              fetchPriority="high"
            />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-foreground/70'
                }`}
                aria-label={`Navegar para ${item.label}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-smooth"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden mt-4 py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-medium transition-smooth hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-foreground/70'
                  }`}
                  aria-label={`Navegar para ${item.label}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
