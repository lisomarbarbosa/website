import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/5591999999999?text=${encodeURIComponent(
      `OlÃ¡, me chamo ${formData.name}. Email: ${formData.email}. Telefone: ${formData.phone}. Mensagem: ${formData.message}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Contato
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Entre em contato para uma consulta inicial sobre seu caso
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              InformaÃ§ÃµÂµes de Contato
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    Email
                  </h4>
                  <a href="mailto:contato@lisomarbarbosa.adv.br" className="text-foreground/70 hover:text-primary transition-smooth">
                    contato@lisomarbarbosa.adv.br
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    Telefone
                  </h4>
                  <a href="tel:+5591999999999" className="text-foreground/70 hover:text-primary transition-smooth">
                    (91) 99999-9999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    LocalizaÃ§Ã£o
                  </h4>
                  <p className="text-foreground/70">
                    BelÃ©m, ParÃ¡ - Atendimento em todo o Brasil
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Envie uma Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth outline-none"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth outline-none"
                  placeholder="(91) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth outline-none resize-none"
                  placeholder="Descreva brevemente sua necessidade jurÃ¡dica..."
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
                aria-label="Enviar mensagem via WhatsApp"
              >
                <MessageCircle size={20} />
                Enviar via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
