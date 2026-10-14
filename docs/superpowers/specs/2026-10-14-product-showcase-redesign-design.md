# Redesign: vitrine de produtos mscodify

## Objetivo
Home simples e direta. Visitante é **usuário final** que quer abrir e usar os produtos.
Site = catálogo. Contato é discreto, no rodapé. Não é mais site de agência/portfólio.

## Fora de escopo
Blog, i18n, páginas individuais por produto, analytics, modo claro, CMS.

## Estrutura da página
Uma página, sem navbar com âncoras.

1. **Topo** (sem fixed navbar): `mscodify` à esquerda, texto simples. Nada mais.
2. **Hero curto**: `h1` com uma frase ("Pequenos produtos web que resolvem uma coisa bem.") e uma linha de apoio. Sem gradiente/brilho, sem selo "Disponível", sem indicador de scroll, sem botões.
3. **Lista de produtos** (layout aprovado: lista tipográfica):
   - uma linha larga por produto, separada por divisória fina;
   - esquerda: nome (heading), `tagline` de uma frase abaixo;
   - direita: `status` em texto discreto + link "Abrir ↗" (nova aba, `rel="noopener"`);
   - miniatura do banner (`next/image`, ~96x56) ao lado do texto; em mobile vai acima do nome ou some se atrapalhar;
   - linha inteira clicável (o link cobre o bloco), foco visível por teclado;
   - hover: leve realce de fundo e deslocamento da seta. Sem framer-motion.
4. **Rodapé discreto**: uma linha — `contato: e-mail · WhatsApp` + `© ano mscodify`. Links `mailto:` e `https://wa.me/5569984432406`.

Ordem dos produtos (relevância p/ usuário final, ajustável em `data/projects.ts`):
Saldo Leve, ToolPocket, ForgeKitDev, Cloudless Play, VetAgende, ReqFly.

## Dados (`data/projects.ts`)
```ts
export type Status = "Grátis" | "Pago" | "Grátis e pago" | "Em desenvolvimento";
export interface Project {
  slug: string;
  name: string;
  tagline: string;   // 1 frase, benefício p/ o usuário
  status: Status[];  // 1-2 itens
  image: string;
  link: string;
}
```
Removidos: `tags`, `badges`, `description` longo, `delay`. Link passa a obrigatório.
`PWA` vira detalhe, não status (pode aparecer na tagline se relevante).

Taglines propostas (revisar o texto):
- Saldo Leve — "Controle seu dinheiro: orçamento, metas e relatórios simples."
- ToolPocket — "Conversores, calculadoras e geradores para o dia a dia."
- ForgeKitDev — "Validadores, geradores e utilitários para quem programa."
- Cloudless Play — "Toque seus áudios offline, sem conta e sem nuvem."
- VetAgende — "Agendamento online para clínicas e petshops, com lembretes automáticos."
- ReqFly — "Teste e automatize requisições HTTP no Windows."

## Remoções
- `components/services.tsx`, `components/contact.tsx`, `components/project-card.tsx` (substituído por `product-row.tsx`), `components/hero.tsx` (reescrito).
- `app/api/contact/route.ts` e diretório `app/api`.
- Dependências: `resend`; `framer-motion`, `@radix-ui/react-slot`, `class-variance-authority` e `components/ui/*` só se ficarem sem uso após a reescrita (verificar com grep, remover do `package.json`).
- Env: `RESEND_*`, `TURNSTILE_*`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` deixam de existir; apagar `.env.local` local e checar config de deploy.
- Imagens sem uso em `public/` (mockups genéricos, fundo neon, svgs do create-next-app) apagadas após confirmar zero referências.

## Visual
Manter tokens atuais em `globals.css` (fundo escuro, ciano `--primary`) para não virar redesign de marca, mas:
- tipografia faz o trabalho (Space Grotesk grande nos nomes, Inter no resto);
- sem `glass`, `text-glow`, gradientes de texto, sombras de brilho;
- container estreito (~`max-w-3xl`/`4xl`), muito espaço vertical, uma coluna.

## SEO / metadados
- Manter `metadata`, OG, `robots`, `sitemap`, `icon`.
- Atualizar `site.title`/`description`/`keywords` para refletir produtos (hoje falam "sistemas sob medida" e Laravel/Next/Nuxt).
- JSON-LD: manter `Organization`; **remover `LocalBusiness`** (não é negócio local) e `telephone`. Opcional futuro: `SoftwareApplication` por produto.
- `site.contactEmail`/`contactPhone` continuam em `data/site.ts` como fonte do rodapé.

## Imagens
Banners atuais (69–733 KB) servidos via `next/image` como miniaturas, o que reduz peso real. Banners de Saldo Leve (733 KB) e VetAgende (364 KB) são os candidatos a reexportar menores se o Lighthouse reclamar. Não criar novas artes nesta etapa.

## Acessibilidade e responsividade
- Estrutura semântica: `header`, `main` com `ul/li`, `footer`.
- Cada linha: um único `<a>` com nome acessível "Abrir <nome>"; status em texto (não só cor).
- Contraste mínimo AA; `prefers-reduced-motion` respeitado (hover só transição de cor/translate curto).
- Funciona de 360px até desktop sem scroll horizontal.

## Verificação
- `npm run lint` e `npm run build` sem erros.
- Conferir no browser em 360px e 1280px: 6 produtos, links corretos, rodapé com mailto/wa.me.
- Grep confirma zero referências a pacotes/arquivos removidos.
- Lighthouse (a11y/SEO) sem regressão visível.

## Decisões em aberto (defaults)
- Taglines: usar as acima até o usuário editar.
- Domínios dos produtos permanecem como estão em `projects.ts`.
- Apagar assets e deps sem uso: sim, após grep.
