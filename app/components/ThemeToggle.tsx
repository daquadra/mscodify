'use client';

import { useEffect, useState, useRef } from 'react';
import { HiSun, HiMoon, HiDesktopComputer, HiChevronDown } from 'react-icons/hi';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme, mounted]);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <HiSun className="w-4 h-4" />;
      case 'dark':
        return <HiMoon className="w-4 h-4" />;
      default:
        return <HiDesktopComputer className="w-4 h-4" />;
    }
  };

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
        aria-label="Selecionar tema"
      >
        {getThemeIcon()}
        <HiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-background border border-foreground/10 rounded-lg shadow-lg overflow-hidden z-50">
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors ${
              theme === 'light' ? 'text-primary bg-primary/5' : 'text-foreground'
            }`}
          >
            <HiSun className="w-4 h-4" />
            Claro
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors ${
              theme === 'dark' ? 'text-primary bg-primary/5' : 'text-foreground'
            }`}
          >
            <HiMoon className="w-4 h-4" />
            Escuro
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors ${
              theme === 'system' ? 'text-primary bg-primary/5' : 'text-foreground'
            }`}
          >
            <HiDesktopComputer className="w-4 h-4" />
            Sistema
          </button>
        </div>
      )}
    </div>
  );
}
