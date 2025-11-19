# Como Configurar os Projetos

Este arquivo explica como configurar seus projetos no arquivo `projects.json`.

## Estrutura do Projeto

Cada projeto no array deve seguir esta estrutura:

```json
{
  "id": 1,
  "name": "Nome do Projeto",
  "description": "Descrição breve do projeto",
  "link": "https://seusite.com",
  "technologies": [
    {
      "name": "React",
      "logo": "/images/logos/react.png",
      "website": "https://react.dev"
    }
  ],
  "backgroundImage": "/images/projects/projeto-bg.jpg",
  "logo": "/images/projects/projeto-logo.png"
}
```

## Campos Obrigatórios

- **id** (número): ID único do projeto
- **name** (string): Nome do projeto
- **description** (string): Descrição curta (recomendado até 150 caracteres)
- **link** (string): URL do projeto ou "#" se não tiver link
- **technologies** (array): Lista de tecnologias usadas

## Campos Opcionais

### backgroundImage
- **Tipo**: string ou null
- **Descrição**: Caminho da imagem de fundo do card
- **Comportamento**:
  - Se fornecido: Exibe a imagem com efeito desfoque que desaparece no hover
  - Se null: Exibe um gradiente com as cores primárias do tema
- **Recomendação**: Imagens em formato 16:9, tamanho mínimo 800x450px
- **Local**: Salve em `/public/images/projects/`

### logo
- **Tipo**: string ou null
- **Descrição**: Caminho do logo do projeto
- **Comportamento**: Exibe um logo no canto superior esquerdo do card
- **Recomendação**: Imagens quadradas, 256x256px, formato PNG com fundo transparente
- **Local**: Salve em `/public/images/projects/`

## Tecnologias

Cada tecnologia pode ter três propriedades:

### name (obrigatório)
- **Tipo**: string
- **Descrição**: Nome da tecnologia
- **Exemplo**: "React", "Node.js", "PostgreSQL"

### logo (opcional)
- **Tipo**: string ou null
- **Descrição**: Caminho do logo da tecnologia
- **Comportamento**:
  - Se fornecido: Exibe o logo ao lado do nome
  - Se null: Exibe apenas o nome
- **Recomendação**: Ícones pequenos, 32x32px ou 64x64px
- **Local**: Salve em `/public/images/tech-logos/`

### website (opcional)
- **Tipo**: string ou null
- **Descrição**: URL do site oficial da tecnologia
- **Comportamento**:
  - Se fornecido: A tecnologia vira um link clicável com efeito hover
  - Se null: Tecnologia não é clicável
- **Exemplo**: "https://react.dev", "https://nodejs.org"

## Exemplo Completo

```json
[
  {
    "id": 1,
    "name": "Sistema de E-commerce",
    "description": "Plataforma completa de vendas online com pagamento integrado e gestão de estoque.",
    "link": "https://meuecommerce.com.br",
    "technologies": [
      {
        "name": "React",
        "logo": "/images/tech-logos/react.png",
        "website": "https://react.dev"
      },
      {
        "name": "Node.js",
        "logo": "/images/tech-logos/nodejs.png",
        "website": "https://nodejs.org"
      },
      {
        "name": "PostgreSQL",
        "logo": null,
        "website": "https://www.postgresql.org"
      }
    ],
    "backgroundImage": "/images/projects/ecommerce-bg.jpg",
    "logo": "/images/projects/ecommerce-logo.png"
  },
  {
    "id": 2,
    "name": "App de Gestão",
    "description": "Sistema de gestão empresarial com dashboards e relatórios.",
    "link": "#",
    "technologies": [
      {
        "name": "Vue.js",
        "logo": null,
        "website": "https://vuejs.org"
      },
      {
        "name": "Firebase",
        "logo": null,
        "website": null
      }
    ],
    "backgroundImage": null,
    "logo": null
  }
]
```

## Dicas

1. **Imagens de Background**: Use imagens relacionadas ao projeto. Screenshots da aplicação funcionam muito bem.

2. **Logos**: Prefira logos em PNG com fundo transparente para melhor visualização.

3. **Descrições**: Seja conciso. Descrições muito longas serão cortadas com "..." (line-clamp-2).

4. **Tecnologias**: Liste as principais tecnologias. Evite listar muitas (recomendado 3-5).

5. **Links**: Se o projeto ainda não está publicado, use "#" no campo link.

6. **Organização de Imagens**:
   ```
   /public/images/
   ├── projects/          # Backgrounds e logos de projetos
   │   ├── projeto1-bg.jpg
   │   ├── projeto1-logo.png
   │   └── projeto2-bg.jpg
   └── tech-logos/        # Logos de tecnologias
       ├── react.png
       ├── nodejs.png
       └── vue.png
   ```

## Efeitos Visuais

- **Blur no hover**: A imagem de background começa desfocada e fica nítida quando você passa o mouse
- **Zoom suave**: A imagem dá um leve zoom no hover
- **Logo flutuante**: O logo do projeto aparece em um card branco com sombra
- **Tecnologias interativas**: Tecnologias com website ficam destacadas no hover e são clicáveis
