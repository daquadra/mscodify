'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Logo() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const root = document.documentElement;
      setIsDark(root.classList.contains('dark'));
    };

    checkTheme();
    let rafId: number | null = null;
    // Defer setting mounted to avoid synchronous setState calls within the same effect
    rafId = requestAnimationFrame(() => setMounted(true));

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const logoSrc = mounted && isDark
    ? '/images/mscodify_logo_white.png'
    : '/images/mscodify_logo_f.png';

  return (
    <div className="relative h-14 w-[200px]">
      <Image
        src={logoSrc}
        alt="MSCodify Logo"
        width={200}
        height={60}
        priority
        className="h-14 w-auto"
      />
    </div>
  );
}
