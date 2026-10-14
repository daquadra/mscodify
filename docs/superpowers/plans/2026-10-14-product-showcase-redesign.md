# Vitrine de produtos mscodify — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o site de agência por uma vitrine simples de 6 produtos (lista tipográfica) com contato discreto no rodapé, sem formulário.

**Architecture:** Página única, tudo server components (sem `"use client"`, sem framer-motion). Dados em `data/projects.ts` e `data/site.ts`. Três componentes pequenos: `Layout` (header + rodapé), `Hero`, `ProductRow`. Rota `/api/contact` e dependências de e-mail/anti-bot removidas.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind 4, `next/image`, `lucide-react` (só `ArrowUpRight`).

**Spec:** `docs/superpowers/specs/2026-10-14-product-showcase-redesign-design.md`

**Fase de design:** este plano entrega **estrutura, dados e comportamento** com estilo neutro e funcional. O tratamento visual (personalidade, tipografia, composição) é uma fase seguinte, separada, feita depois deste plano. Por isso o markup usa classes Tailwind simples e concentra o visual em poucos pontos fáceis de trocar.

## Global Constraints

- Não há test runner no projeto e não vamos adicionar um (YAGNI). Verificação de cada task: `npx tsc --noEmit`, `npm run lint`, `npm run build`, `grep`, e `curl` no dev server.
- Tipos de status exatos: `"Grátis" | "Pago" | "Grátis e pago" | "Em desenvolvimento"`.
- Links de produto abrem em nova aba com `target="_blank" rel="noopener"`.
- WhatsApp: `https://wa.me/5569984432406`. E-mail: `suporte@mscodify.dev.br`.
- Ordem dos produtos: Saldo Leve, ToolPocket, ForgeKitDev, Cloudless Play, VetAgende, ReqFly.
- Locale `pt-BR`. Texto de interface em português com acentos.
- Manter tokens de cor de `app/globals.css`; remover só `.text-glow` e `.glass`.
- Sem `"use client"` em nenhum arquivo ao final.
- Dev server já roda em `http://localhost:3000` (`npm run dev`); se não estiver, subir de novo.

## Review Focus

- Produto sem imagem ou imagem quebrada: a linha deve continuar legível (alt vazio, caixa com fundo). Pinado na Task 2 (miniatura usa `alt=""` e fundo fixo).
- Tela de 360px: nenhum scroll horizontal; nome longo ("Cloudless Play") quebra linha em vez de estourar. Pinado na Task 2 (`min-w-0`, `flex-wrap`) e na Task 5 (checagem manual).
- Navegação só por teclado: Tab chega em cada linha e mostra foco visível; Enter abre o produto. Pinado na Task 2 (um único `<a>` por linha) e Task 5.
- Referência esquecida a arquivo/dependência removida quebra o build. Pinado na Task 4 (grep antes de apagar) e Task 5 (`npm run build`).
- Visitante com `RESEND_*`/`TURNSTILE_*` no ambiente de deploy: não deve causar erro; as variáveis só ficam ignoradas. Pinado na Task 4.

---

### Task 1: Dados dos produtos e do site

**Files:**
- Modify: `data/projects.ts` (reescrever)
- Modify: `data/site.ts`

**Interfaces:**
- Produces: `type Status`, `interface Project { slug: string; name: string; tagline: string; status: Status[]; image: string; link: string }`, `const projects: Project[]` (em `data/projects.ts`); `site.whatsapp: string` e `site.title/description/keywords` atualizados (em `data/site.ts`).

- [ ] **Step 1: Reescrever `data/projects.ts`**

```ts
export type Status = "Grátis" | "Pago" | "Grátis e pago" | "Em desenvolvimento";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: Status[];
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    slug: "saldo-leve",
    name: "Saldo Leve",
    tagline: "Controle seu dinheiro: orçamento, metas e relatórios simples.",
    status: ["Grátis e pago"],
    image: "/generated_images/contaleve_banner_1.png",
    link: "https://saldoleve.com.br/",
  },
  {
    slug: "toolpocket",
    name: "ToolPocket",
    tagline: "Conversores, calculadoras e geradores para o dia a dia.",
    status: ["Grátis"],
    image: "/generated_images/banner_toolpocket.png",
    link: "https://toolpocket.mscodify.dev.br/",
  },
  {
    slug: "forgekitdev",
    name: "ForgeKitDev",
    tagline: "Validadores, geradores e utilitários para quem programa.",
    status: ["Grátis"],
    image: "/generated_images/banner_forgekitdev.png",
    link: "https://forgekitdev.mscodify.dev.br/",
  },
  {
    slug: "cloudless-play",
    name: "Cloudless Play",
    tagline: "Toque seus áudios offline, sem conta e sem nuvem.",
    status: ["Grátis"],
    image: "/generated_images/banner_cloudless-player.png",
    link: "https://cloudless-play.mscodify.dev.br/",
  },
  {
    slug: "vetagende",
    name: "VetAgende",
    tagline:
      "Agendamento online para clínicas e petshops, com lembretes automáticos.",
    status: ["Pago"],
    image: "/generated_images/banner_vetagende.png",
    link: "https://vetagende.com.br/",
  },
  {
    slug: "reqfly",
    name: "ReqFly",
    tagline: "Teste e automatize requisições HTTP no Windows.",
    status: ["Em desenvolvimento"],
    image: "/generated_images/reqfly_banner_3.png",
    link: "https://reqfly.mscodify.dev.br",
  },
];
```

- [ ] **Step 2: Reescrever `data/site.ts`**

```ts
export const site = {
  name: "mscodify",
  title: "mscodify | Pequenos produtos web que resolvem uma coisa bem",
  description:
    "Ferramentas e apps para usar no navegador: finanças pessoais, utilitários do dia a dia, ferramentas para devs, player offline e agendamento para clínicas.",
  url: "https://mscodify.dev.br",
  locale: "pt-BR",
  ogImage: "/opengraph.png",
  contactEmail: "suporte@mscodify.dev.br",
  whatsapp: "https://wa.me/5569984432406",
  keywords: [
    "ferramentas online",
    "controle financeiro",
    "calculadoras",
    "utilitários para desenvolvedores",
    "player offline",
    "agendamento para petshop",
    "mscodify",
  ],
};
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: erros apenas em `components/project-card.tsx`, `app/page.tsx`, `app/layout.tsx` (`contactPhone` sumiu). Eles somem nas próximas tasks. Nenhum erro dentro de `data/`.

- [ ] **Step 4: Commit**

```bash
git add data/projects.ts data/site.ts
git commit -m "feat: reestruturar dados de produtos e site para vitrine"
```

---

### Task 2: Componentes `ProductRow`, `Hero` e `Layout`

**Files:**
- Create: `components/product-row.tsx`
- Modify: `components/hero.tsx` (reescrever)
- Modify: `components/layout.tsx` (reescrever)

**Interfaces:**
- Consumes: `Project` de `@/data/projects`; `site` de `@/data/site`.
- Produces: `default export ProductRow(props: Project)`, `default export Hero()`, `default export Layout({ children }: { children: React.ReactNode })`. Todos server components.

- [ ] **Step 1: Criar `components/product-row.tsx`**

```tsx
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProductRow({
  name,
  tagline,
  status,
  image,
  link,
}: Project) {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        aria-label={`Abrir ${name}`}
        className="group flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border px-4 py-7 -mx-4 rounded-lg transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-card">
          <Image src={image} alt="" fill sizes="96px" className="object-cover" />
        </div>

        <div className="min-w-0 flex-1 basis-72">
          <h3 className="font-heading text-2xl font-bold">{name}</h3>
          <p className="mt-1 text-muted-foreground">{tagline}</p>
        </div>

        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <span>{status.join(" · ")}</span>
          <span className="flex items-center gap-1 font-medium text-foreground group-hover:text-primary">
            Abrir
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </li>
  );
}
```

- [ ] **Step 2: Reescrever `components/hero.tsx`**

```tsx
export default function Hero() {
  return (
    <section className="pb-16 pt-20 md:pt-28">
      <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
        Pequenos produtos web que resolvem uma coisa bem.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">
        Ferramentas para usar hoje, direto no navegador. Escolha uma e abra.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Reescrever `components/layout.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/data/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6">
        <header className="pt-8">
          <Link href="/" className="font-heading text-lg font-bold tracking-tight">
            {site.name}
          </Link>
        </header>

        <main>{children}</main>

        <footer className="flex flex-wrap justify-between gap-x-6 gap-y-3 py-12 text-sm text-muted-foreground">
          <p>
            Contato:{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {site.contactEmail}
            </a>{" "}
            ·{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 hover:text-foreground"
            >
              WhatsApp
            </a>
          </p>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </footer>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verificar**

Run: `npx tsc --noEmit 2>&1 | grep -E "product-row|hero.tsx|components/layout"`
Expected: sem saída (nenhum erro nesses três arquivos).

- [ ] **Step 5: Commit**

```bash
git add components/product-row.tsx components/hero.tsx components/layout.tsx
git commit -m "feat: adicionar ProductRow e reescrever Hero e Layout"
```

---

### Task 3: Página, metadados e JSON-LD

**Files:**
- Modify: `app/page.tsx` (reescrever)
- Modify: `app/layout.tsx:77-101` (JSON-LD)

**Interfaces:**
- Consumes: `Layout`, `Hero`, `ProductRow`, `projects`, `site` (Tasks 1–2).

- [ ] **Step 1: Reescrever `app/page.tsx`**

```tsx
import Layout from "@/components/layout";
import Hero from "@/components/hero";
import ProductRow from "@/components/product-row";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ul className="border-b border-border">
        {projects.map((project) => (
          <ProductRow key={project.slug} {...project} />
        ))}
      </ul>
    </Layout>
  );
}
```

- [ ] **Step 2: Em `app/layout.tsx`, deixar só `Organization` no JSON-LD**

Substituir o bloco de `organizationLd`/`localBusinessLd` e o `<Script>` por:

```tsx
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: new URL(site.ogImage, site.url).toString(),
    email: site.contactEmail,
  };
```

e no `<Script>`:

```tsx
dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
```

- [ ] **Step 3: Verificar no browser**

Run: `curl -s localhost:3000 | grep -o "Abrir [A-Za-z ]*" | sort -u`
Expected: seis linhas: Abrir Saldo Leve, ToolPocket, ForgeKitDev, Cloudless Play, VetAgende, ReqFly (o dev server recompila sozinho).

Run: `curl -s localhost:3000 | grep -c "LocalBusiness"`
Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: montar home com lista de produtos e JSON-LD Organization"
```

---

### Task 4: Remover o que não é mais usado

**Files:**
- Delete: `components/services.tsx`, `components/contact.tsx`, `components/project-card.tsx`, `components/ui/` (diretório), `lib/utils.ts`, `app/api/` (diretório)
- Delete (após grep): imagens e svgs sem uso em `public/`
- Modify: `package.json` / `package-lock.json` (via npm)
- Modify: `app/globals.css` (remover `.text-glow`, `.glass`)
- Delete local: `.env.local`

- [ ] **Step 1: Confirmar que nada novo referencia o que vai sair**

Run: `grep -rn "components/ui\|lib/utils\|services\|contact\"\|project-card\|framer-motion\|class-variance-authority\|@radix-ui\|clsx\|tailwind-merge\|resend\|turnstile\|text-glow\|glass" app components data`
Expected: ocorrências apenas dentro de `components/services.tsx`, `components/contact.tsx`, `components/project-card.tsx`, `components/ui/*`, `lib/utils.ts`, `app/api/contact/route.ts` e das duas classes em `app/globals.css`. Qualquer outra ocorrência: parar e corrigir antes de apagar.

- [ ] **Step 2: Apagar código morto**

```bash
git rm -r components/services.tsx components/contact.tsx components/project-card.tsx components/ui lib/utils.ts app/api
rm -f .env.local
```

- [ ] **Step 3: Remover dependências sem uso**

Run: `npm uninstall resend framer-motion @radix-ui/react-slot class-variance-authority clsx tailwind-merge`
Expected: `package.json` mantém `lucide-react`, `next`, `react`, `react-dom` e devDependencies.

- [ ] **Step 4: Limpar `app/globals.css`**

Apagar o bloco `@layer utilities { .text-glow {...} .glass {...} }` (últimas linhas do arquivo).

- [ ] **Step 5: Apagar assets sem uso**

Run: `grep -rn "mockup\|abstract_dark\|file.svg\|globe.svg\|next.svg\|vercel.svg\|window.svg" app components data`
Expected: sem saída. Então:

```bash
git rm public/generated_images/abstract_dark_technology_background_with_glowing_lines.png public/generated_images/corporate_landing_page_ui_mockup.png public/generated_images/mobile_e-commerce_app_ui_mockup.png public/generated_images/saas_dashboard_ui_mockup.png public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

Conferir que `public/favicon.svg`, `public/opengraph.png` e `public/opengraph.svg` continuam (usados por metadados).

- [ ] **Step 6: Verificar**

Run: `npx tsc --noEmit && npm run lint`
Expected: sem erros, sem avisos de `<img>` nem de `useEffect`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remover formulario de contato, secoes antigas e dependencias sem uso"
```

Nota de deploy: remover `RESEND_*`, `TURNSTILE_*` e `NEXT_PUBLIC_TURNSTILE_SITE_KEY` do painel de ambiente (Vercel ou equivalente). Deixá-las não causa erro.

---

### Task 5: Verificação final

**Files:** nenhum (só leitura).

- [ ] **Step 1: Build de produção**

Run: `npm run build`
Expected: build ok; rotas `/`, `/robots.txt`, `/sitemap.xml`, `/icon`; nenhuma rota `/api/*`.

- [ ] **Step 2: Conferir no browser (360px e 1280px)**

Abrir `http://localhost:3000` nas duas larguras. Checar: seis linhas na ordem da spec; sem scroll horizontal a 360px; nomes e taglines não estouram; miniaturas carregam; Tab percorre as linhas com foco visível; Enter abre o produto em nova aba; links do rodapé (`mailto:` e `wa.me`) corretos.

- [ ] **Step 3: Conferir peso e metadados**

Run: `curl -s localhost:3000 | grep -o 'og:title[^>]*' | head -1`
Expected: título novo ("Pequenos produtos web…").

- [ ] **Step 4: Se algo falhou, corrigir e commitar; senão, reportar**

Sem commit extra se nada mudou.

---

## Self-Review

- **Cobertura da spec:** estrutura de página (Tasks 2–3), dados e taglines (1), remoções de código/deps/env/assets (4), SEO e JSON-LD (1, 3), imagens via `next/image` (2), acessibilidade e responsivo (2, 5), verificação (5). Sem lacunas.
- **Placeholders:** nenhum. Todo código está escrito.
- **Consistência de tipos:** `Project` (`slug`, `name`, `tagline`, `status`, `image`, `link`) é igual em Tasks 1, 2 e 3; `site.whatsapp` e `site.contactEmail` usados em `Layout` existem em `site.ts`; `contactPhone` removido e não referenciado (o `LocalBusiness` que o usava sai na Task 3).
- **Fora do plano, por decisão:** tratamento visual/personalidade (fase de design seguinte), testes automatizados (sem runner).
