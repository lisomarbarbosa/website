import { Shield, Lock, FileText, Globe, Smartphone, Scale } from 'lucide-react';

const areas = [
  {
    icon: Shield,
    title: 'ProteÃ§Ã£o de Dados',
    description: 'LGPD, privacidade digital e compliance em proteÃ§Ã£o de dados pessoais',
    color: 'text-blue-500',
  },
  {
    icon: Lock,
    title: 'Direito Digital',
    description: 'Crimes cibernÃ©ticos, vazamento de dados e responsabilidade online',
    color: 'text-purple-500',
  },
  {
    icon: FileText,
    title: 'Contratos Digitais',
    description: 'Termos de uso, polÃ¡ticas de privacidade e contratos para plataformas online',
    color: 'text-green-500',
  },
  {
    icon: Globe,
    title: 'Propriedade Intelectual',
    description: 'Marcas, patentes, direitos autorais e proteÃ§Ã£o de conteÃºdo digital',
    color: 'text-orange-500',
  },
  {
    icon: Smartphone,
    title: 'Redes Sociais',
    description: 'Responsabilidade em redes sociais, remoÃ§Ã£o de conteÃºdo e danos digitais',
    color: 'text-pink-500',
  },
  {
    icon: Scale,
    title: 'Direito do Consumidor',
    description: 'ComÃ©rcio eletrÃ´nico, compras online e direitos do consumidor digital',
    color: 'text-indigo-500',
  },
];

const PracticeAreas = () => {
  return (
    <section id="areas" className="py-20 lg:py-32 bg-background/50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Ãreas de AtuaÃ§Ã£o
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expertise Multidisciplinar
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Cobertura completa em todas as vertentes do direito digital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-smooth hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <area.icon className="w-6 h-6" style={{ color: area.color.replace('text-', '') }} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {area.title}
              </h3>
              <p className="text-foreground/70">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
