# Como Configurar seu Perfil

Para personalizar as informações do seu perfil, edite o arquivo `profile.json` nesta pasta.

## Estrutura do Perfil

```json
{
  "name": "Seu Nome",
  "role": "Desenvolvedor Full Stack",
  "photo": "/images/profile.jpg",
  "bio": "Sua biografia...",
  "whatsapp": "5511999999999",
  "email": "contato@mscodify.com",
  "social": {
    "linkedin": "https://linkedin.com/in/seu-perfil",
    "github": "https://github.com/seu-usuario",
    "instagram": "https://instagram.com/seu-usuario"
  }
}
```

## Campos

### Informações Básicas
- **name**: Seu nome completo
- **role**: Seu cargo/função (ex: "Desenvolvedor Full Stack")
- **photo**: Caminho para sua foto (coloque a imagem em `/public/images/`)
- **bio**: Descrição profissional (1-2 parágrafos)

### Contato
- **whatsapp**: Número do WhatsApp no formato internacional sem + (ex: `5511999999999`)
  - Este número será usado tanto na seção "Sobre" quanto no formulário de contato
- **email**: Seu email profissional

### Redes Sociais
- **linkedin**: URL completa do seu perfil
- **github**: URL completa do seu perfil
- **instagram**: URL completa do seu perfil

## Foto de Perfil

1. Adicione sua foto em `/public/images/` (ex: `profile.jpg`)
2. Atualize o campo `photo` com o caminho: `"/images/profile.jpg"`
3. Formato recomendado: JPG ou PNG
4. Tamanho recomendado: 400x400px (quadrada)

## Configurar WhatsApp

O número do WhatsApp deve estar no formato internacional:
- **Brasil**: `55` + DDD + número (ex: `5511999999999`)
- **Portugal**: `351` + número
- **EUA**: `1` + código de área + número

Este número será usado em dois lugares:
1. **Seção "Sobre"**: Botão direto para WhatsApp
2. **Formulário de Contato**: Mensagem formatada será enviada para este número

## Exemplo Completo

```json
{
  "name": "João Silva",
  "role": "Desenvolvedor Full Stack",
  "photo": "/images/joao-silva.jpg",
  "bio": "Desenvolvedor com 5 anos de experiência em criar soluções web modernas. Especialista em React, Node.js e arquitetura de sistemas escaláveis.",
  "whatsapp": "5511987654321",
  "email": "joao@mscodify.com",
  "social": {
    "linkedin": "https://linkedin.com/in/joaosilva",
    "github": "https://github.com/joaosilva",
    "instagram": "https://instagram.com/joaosilva.dev"
  }
}
```
