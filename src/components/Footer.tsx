import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-foreground-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Lisomar Barbosa Advocacia</h3>
            <p className="text-foreground-foreground/70 mb-4">
              Advocacia especializada em Direito Digital com foco em proteÃ§Ã£o de dados, contratos digitais e propriedade intelectual.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <a href="mailto:contato@lisomarbarbosa.adv.br" className="flex items-center gap-3 text-foreground-foreground/70 hover:text-primary transition-smooth" aria-label="Enviar email">
                <Mail size={20} />
                <span>contato@lisomarbarbosa.adv.br</span>
              </a>
              <a href="tel:+5591999999999" className="flex items-center gap-3 text-foreground-foreground/70 hover:text-primary transition-smooth" aria-label="Ligar agora">
                <Phone size={20} />
                <span>(91) 99999-9999</span>
              </a>
              <div className="flex items-center gap-3 text-foreground-foreground/70">
                <MapPin size={20} />
                <span>BelÃ©m, ParÃ¡ - Atendimento em todo o Brasil</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/lisomarbarbosa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-foreground-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/lisomarbarbosa.adv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-foreground-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground-foreground/20 pt-8 text-center text-foreground-foreground/60 text-sm">
          <p>&copy; {currentYear} Lisomar Barbosa Advocacia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
