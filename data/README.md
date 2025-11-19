# Como Adicionar Projetos

Para adicionar ou editar projetos no portfólio, edite o arquivo `projects.json` nesta pasta.

## Estrutura de um Projeto

```json
{
  "id": 1,
  "name": "Nome do Projeto",
  "description": "Breve descrição do projeto",
  "link": "https://exemplo.com/projeto",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "icon": "🏢"
}
```

### Campos:

- **id**: Número único do projeto (incremental)
- **name**: Nome do projeto
- **description**: Descrição breve (1-2 linhas)
- **link**: URL do projeto (pode ser site, GitHub, etc.)
- **technologies**: Array de strings com as tecnologias usadas
- **icon**: Emoji que representa o projeto

## Exemplo Completo

```json
[
  {
    "id": 1,
    "name": "Sistema Empresarial",
    "description": "Plataforma de gestão completa com dashboard analytics e automações.",
    "link": "https://exemplo.com/projeto1",
    "technologies": ["React", "Node.js", "PostgreSQL"],
    "icon": "🏢"
  },
  {
    "id": 2,
    "name": "E-commerce Moderno",
    "description": "Loja virtual com pagamentos integrados e gestão de estoque em tempo real.",
    "link": "https://exemplo.com/projeto2",
    "technologies": ["Next.js", "Stripe", "MongoDB"],
    "icon": "🛒"
  }
]
```

## Layout

O grid de projetos se adapta automaticamente:
- **1 projeto**: ocupa toda a largura
- **2 projetos**: 2 colunas
- **3+ projetos**: 2 colunas (responsivo)

Não há limite de projetos que podem ser adicionados.
