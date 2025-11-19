'use client';

import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    // Aguardar um pouco para o menu fechar antes de fazer o scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Botão do Menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Slide */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background border-l border-foreground/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header do Menu */}
          <div className="flex items-center justify-between p-6 border-b border-foreground/10">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
              aria-label="Fechar menu"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="flex-1 flex flex-col p-6 space-y-4">
            <button
              onClick={() => handleLinkClick('#servicos')}
              className="text-left text-lg text-foreground/70 hover:text-primary transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => handleLinkClick('#projetos')}
              className="text-left text-lg text-foreground/70 hover:text-primary transition-colors"
            >
              Projetos
            </button>
            <button
              onClick={() => handleLinkClick('#sobre')}
              className="text-left text-lg text-foreground/70 hover:text-primary transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => handleLinkClick('#contato')}
              className="text-left text-lg text-foreground/70 hover:text-primary transition-colors"
            >
              Contato
            </button>

            <div className="pt-4 border-t border-foreground/10">
              <ThemeToggle />
            </div>
          </nav>

          {/* CTA */}
          <div className="p-6 border-t border-foreground/10">
            <button
              onClick={() => handleLinkClick('#contato')}
              className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors font-medium"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
