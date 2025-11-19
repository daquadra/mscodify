'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para sanitizar e validar entrada
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove < e >
      .replace(/javascript:/gi, '') // Remove javascript:
      .replace(/on\w+=/gi, '') // Remove eventos inline
      .trim();
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Sanitizar inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Validações
    if (!sanitizedName || sanitizedName.length < 2) {
      alert('Por favor, insira um nome válido.');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      alert('Por favor, insira um email válido.');
      setIsSubmitting(false);
      return;
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      alert('Por favor, insira uma mensagem com pelo menos 10 caracteres.');
      setIsSubmitting(false);
      return;
    }

    // Formatar mensagem para WhatsApp
    const whatsappMessage = `*Nova mensagem do site MSCodify*\n\n` +
      `*Nome:* ${sanitizedName}\n` +
      `*Email:* ${sanitizedEmail}\n\n` +
      `*Mensagem:*\n${sanitizedMessage}`;

    // Número do WhatsApp (coloque seu número aqui no formato internacional sem +)
    const whatsappNumber = '5569984432406'; // Substitua pelo seu número

    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Limpar formulário
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          placeholder="Seu nome completo"
          required
          minLength={2}
          maxLength={100}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          placeholder="seu@email.com"
          required
          maxLength={100}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensagem
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-foreground/20 bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
          placeholder="Conte-me sobre seu projeto..."
          required
          minLength={10}
          maxLength={1000}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          'Abrindo WhatsApp...'
        ) : (
          <>
            <span>Enviar via WhatsApp</span>
            <span>💬</span>
          </>
        )}
      </button>
      <p className="text-xs text-foreground/60 text-center">
        Ao enviar, você será redirecionado para o WhatsApp com a mensagem preenchida.
      </p>
    </form>
  );
}
