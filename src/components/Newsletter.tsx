import { useState } from 'react';
import { Send } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Substitua pela URL do seu Google Apps Script
      const response = await fetch('https://script.google.com/macros/exec/SEU_ID_AQUI', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-primary/5 rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-foreground mb-2">
        Receba artigos novos por e-mail
      </h3>
      <p className="text-foreground/70 mb-4 text-sm">
        Inscreva-se para receber notificações quando publicarmos conteúdo novo.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className="flex-1 px-4 py-3 rounded-lg border border-border/50 bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth outline-none text-sm"
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {status === 'loading' ? (
            'Enviando...'
          ) : status === 'success' ? (
            'Inscrito!'
          ) : (
            <>
              Inscrever
              <Send size={16} />
            </>
          )}
        </button>
      </form>

      {status === 'success' && (
        <p className="text-green-600 text-sm mt-3">
          ✅ Obrigado! Você receberá nossos artigos por e-mail.
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-3">
          ❌ Erro ao inscrever. Tente novamente.
        </p>
      )}
    </div>
  );
};
