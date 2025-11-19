import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Analytics from './components/Analytics';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mscodify.dev.br'),
  title: {
    default: 'MSCodify - Desenvolvimento de Software Profissional',
    template: '%s | MSCodify'
  },
  description: 'Transforme suas ideias em soluções digitais. Desenvolvimento web, PWAs e análise de sistemas com tecnologias modernas e escaláveis.',
  keywords: [
    'desenvolvimento de software',
    'desenvolvimento web',
    'PWA',
    'Progressive Web Apps',
    'análise de sistemas',
    'React',
    'Node.js',
    'Next.js',
    'desenvolvimento full stack',
    'criação de sites',
    'sistemas web',
    'e-commerce',
    'MSCodify',
    'Madson Lima'
  ],
  authors: [{ name: 'Madson Lima', url: 'https://mscodify.dev.br' }],
  creator: 'MSCodify',
  publisher: 'MSCodify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mscodify.dev.br',
    siteName: 'MSCodify',
    title: 'MSCodify - Desenvolvimento de Software Profissional',
    description: 'Transforme suas ideias em soluções digitais. Desenvolvimento web, PWAs e análise de sistemas.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSCodify - Desenvolvimento de Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSCodify - Desenvolvimento de Software Profissional',
    description: 'Transforme suas ideias em soluções digitais. Desenvolvimento web, PWAs e análise de sistemas.',
    images: ['/images/og-image.png'],
    creator: '@mscodify',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Verificação não necessária - já verificado no Google Search Console e Bing Webmaster
  alternates: {
    canonical: 'https://mscodify.dev.br',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  if (theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    document.documentElement.classList.add(systemTheme);
                  } else {
                    document.documentElement.classList.add(theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
