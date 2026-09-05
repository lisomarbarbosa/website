import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero = ({ setActiveSection }: HeroProps) => {
  const scrollToContact = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('contato');
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 gradient-hero animate-gradient-shift bg-[length:200%_200%]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Advocacia Digital Especializada
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            ProteÃ§Ã£o jurÃ¡dica na era digital para profissionais, empresas e criadores de conteÃºdo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth whitespace-nowrap"
              aria-label="Entrar em contato agora"
            >
              Falar com Advogado
              <ArrowRight size={20} />
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('areas');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection('areas');
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-smooth whitespace-nowrap"
              aria-label="Ver Ãreas de atuaÃ§Ã£o"
            >
              Conhecer ServiÃ§os
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
