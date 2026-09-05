import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'EmpresÃ¡ria do Setor de Tecnologia',
    content: 'Excelente atendimento! O Dr. Lisomar me ajudou a estruturar todos os contratos digitais da minha startup. Profissionalismo e conhecimento tÃ©cnico notÃ¡veis.',
  },
  {
    name: 'Carlos Mendes',
    role: 'Advogado',
    content: 'Parceiro em casos complexos de direito digital. Sempre atualizado e com uma abordagem prÃ¡tica que faz a diferenÃ§a nos resultados.',
  },
  {
    name: 'Fernanda Costa',
    role: 'Influenciadora Digital',
    content: 'Me senti segura e amparada em um momento delicado. O Dr. Lisomar resolveu meu caso de vazamento de conteÃºdo com rapidez e eficiÃªncia.',
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-secondary/20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O Que Dizem Nossos Clientes
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            HistÃ³rias reais de quem confiou em nosso trabalho
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card border border-border/50 rounded-2xl p-8 lg:p-12">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-secondary/20" />
            
            <div className="relative z-10">
              <p className="text-lg lg:text-xl text-foreground/80 mb-8 leading-relaxed text-center">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-foreground mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-foreground/60">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                      index === currentIndex
                        ? 'bg-primary w-8'
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                    aria-current={index === currentIndex ? 'true' : undefined}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth"
                aria-label="PrÃ³ximo depoimento"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
