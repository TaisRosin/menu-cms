# Menu CMS — Cardápio Digital

Interface administrativa do cardápio digital, desenvolvida com Vite, React, TypeScript, Tailwind CSS, shadcn/ui, Axios e TanStack Query.

## Executar localmente

Pré-requisitos: Node.js 22.12 ou superior e npm. A configuração foi desenvolvida com Node.js 24.19 e npm 11.17.

Na pasta `cms` (ou na raiz de uma cópia deste repositório):

```sh
npm install
```

Copie `.env.example` para `.env`. No PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure o endereço do backend NestJS em `.env`:

```dotenv
VITE_API_URL=http://localhost:3000
```

O endereço deve usar HTTP ou HTTPS. Reinicie o servidor após alterar o ambiente. As variáveis `VITE_*` são públicas no navegador: não coloque credenciais nelas.

```sh
npm run dev
```

Abra o endereço exibido pelo Vite. Sem uma URL válida, a interface mostra uma orientação e o cliente HTTP bloqueia requisições.

## Estado atual

Base do CMS com menu e páginas de Categorias, Produtos, Mesas e Comandas, além da rota de detalhes de uma comanda. Categorias possui listagem, cadastro, edição e exclusão com confirmação, validação de nome, URL e ordem, controle de situação e remoção do ícone. A interface trata carregamento, falha, lista vazia e conflito de exclusão por produtos vinculados. As demais seções mantêm o aviso de implementação pendente.

Para carregar categorias, o backend precisa estar executando no endereço de `VITE_API_URL` e oferecer o campo `displayOrder`. Sem a API, a tela apresenta erro e permite tentar novamente. Não há dados operacionais simulados na aplicação.

Os domínios serão implementados incrementalmente. Requisitos em [docs/requisitos.md](docs/requisitos.md), contexto em [docs/visao.md](docs/visao.md) e especificações em `openspec/`.

Categorias foi verificada com build, lint, 56 testes HTTP isolados no backend e testes no navegador usando a API NestJS com repositório em memória. A integração com PostgreSQL, incluindo alteração de schema e integridade dos vínculos, permanece pendente de uma conexão válida. Resultados em [tarefas de Categorias](openspec/changes/gerenciar-categorias/tasks.md).

## Verificar e gerar build

```sh
npm run lint
npm run build
npm run preview
```

O build é gerado em `dist`. `preview` serve para conferir o build localmente. Em hospedagem futura, o servidor deverá encaminhar as rotas da aplicação para `index.html` para suportar acesso direto e recarregamento.

## Organização

- `src/pages`: páginas das rotas.
- `src/components`: layout, avisos compartilhados e componentes shadcn/ui.
- `src/lib`: instância Axios, formatação e utilitários.
- `src/cases/<domínio>`: DTOs, services, hooks e componentes serão adicionados conforme cada funcionalidade for implementada.

## Dependências adicionais

As dependências abaixo seguem a referência `menu-frontend`, além da stack obrigatória. As versões instaladas ficam registradas em `package-lock.json`.

| Dependência | Justificativa |
|---|---|
| `react-dom` | Renderizar a aplicação React no navegador. |
| `react-router-dom` | Navegação entre páginas, detalhes de comanda e tratamento de rotas desconhecidas. |
| `@base-ui/react` | Primitivas acessíveis usadas pelo shadcn no estilo `base-vega`, como Button. |
| `class-variance-authority` | Definir variantes visuais dos componentes shadcn. |
| `cn` | Combinar classes CSS, seguindo o utilitário utilizado em aula. |
| `lucide-react` | Ícones da navegação e dos avisos. |
| `@fontsource-variable/inter` | Disponibilizar localmente a fonte usada na interface, sem depender de serviço externo de fontes. |
| `tw-animate-css` | Estilos de animação compatíveis com os componentes shadcn da referência. |
| `@tailwindcss/vite` | Integrar o Tailwind ao processamento de estilos do Vite. |
| `@vitejs/plugin-react` | Integrar React e atualização de componentes ao Vite. |
| `@types/node` | Tipagem das APIs Node usadas na configuração. |
| `@types/react` | Tipagem dos componentes e APIs React. |
| `@types/react-dom` | Tipagem da montagem da aplicação no DOM. |
| `eslint` | Análise estática do código pelo comando `npm run lint`. |
| `@eslint/js` | Regras recomendadas de JavaScript para o ESLint. |
| `typescript-eslint` | Análise de TypeScript pelo ESLint. |
| `eslint-plugin-react-hooks` | Verificação do uso dos hooks React. |
| `eslint-plugin-react-refresh` | Verificação de compatibilidade com atualização de componentes durante o desenvolvimento. |
| `globals` | Definição dos globais do navegador para o ESLint. |

OpenSpec é uma ferramenta externa de desenvolvimento, não uma dependência da aplicação. Esta mudança utiliza OpenSpec 2.0.0.

## Versionamento

Não versionar `.env`, dependências instaladas, saída de build ou credenciais. Manter `.env.example` atualizado. Commits pequenos em português seguem Conventional Commits e dependem de aprovação, assim como pushes.
