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

      {/* Overlay com Backdrop Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-100 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Slide */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-background shadow-2xl border-l-4 border-primary z-110 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-screen">
          {/* Header do Menu */}
          <div className="flex items-center justify-between p-6 border-b-2 border-primary/20 bg-foreground/5">
            <span className="font-bold text-xl text-foreground">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              aria-label="Fechar menu"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="flex-1 flex flex-col p-6 space-y-2">
            <button
              onClick={() => handleLinkClick('#servicos')}
              className="text-left text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 px-4 py-3 rounded-lg transition-all"
            >
              Serviços
            </button>
            <button
              onClick={() => handleLinkClick('#projetos')}
              className="text-left text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 px-4 py-3 rounded-lg transition-all"
            >
              Projetos
            </button>
            <button
              onClick={() => handleLinkClick('#sobre')}
              className="text-left text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 px-4 py-3 rounded-lg transition-all"
            >
              Sobre
            </button>
            <button
              onClick={() => handleLinkClick('#contato')}
              className="text-left text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 px-4 py-3 rounded-lg transition-all"
            >
              Contato
            </button>

            <div className="pt-4 border-t border-foreground/10">
              <ThemeToggle />
            </div>
          </nav>

          {/* CTA */}
          <div className="p-6 border-t-2 border-primary/20 bg-foreground/5">
            <button
              onClick={() => handleLinkClick('#contato')}
              className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-xl transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
