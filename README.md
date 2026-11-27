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

CMS completo com CRUD de Categorias, Produtos e Mesas; consulta de comandas abertas; detalhes dos pedidos, itens e valores históricos; e alteração livre entre os quatro status de pedido. As telas tratam carregamento, falha, vazio e resultado das operações. Exclusões exigem confirmação e respeitam os vínculos existentes.

Para carregar categorias, o backend precisa estar executando no endereço de `VITE_API_URL` e oferecer o campo `displayOrder`. Produtos exige também `vegetarian`, `isNew` e suporte à consulta `includeInactive=true`, mantendo ativos como padrão para o cardápio. Sem a API, a tela apresenta erro e permite tentar novamente. Não há dados operacionais simulados na aplicação.

Roteiro de conferência em [docs/validacao-final.md](docs/validacao-final.md), requisitos em [docs/requisitos.md](docs/requisitos.md), contexto em [docs/visao.md](docs/visao.md) e especificações em `openspec/`. Antes de iniciar a API atualizada, execute nela `npm run migrate:order-status` para adequar o enum de pedidos. Comandas e pedidos são consultados novamente a cada 30 segundos e após alterações de status.

Categorias foi verificada com build, lint, 56 testes HTTP isolados no backend e testes no navegador usando a API NestJS com repositório em memória. A integração HTTP com PostgreSQL também foi validada em tabelas temporárias, incluindo integridade dos vínculos. A coluna displayOrder foi adicionada ao banco do projeto, preservando as categorias existentes. A leitura das categorias, filtro de produtos e recarregamento no cardápio de referência foram conferidos no navegador com banco real. Resultados em [tarefas de Categorias](openspec/changes/archive/2026-11-26-gerenciar-categorias/tasks.md).

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
- `src/cases/<domínio>`: DTOs, services, hooks e componentes de cada funcionalidade.

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

## Validação de Produtos

Build/lint aprovados, 118 testes HTTP de Categorias e Produtos aprovados e CRUD de Produtos exercitado com PostgreSQL em tabelas temporárias e no navegador. As duas colunas novas foram adicionadas ao banco preservando os 39 produtos existentes. Detalhes em [tarefas de Produtos](openspec/changes/archive/2026-11-26-gerenciar-produtos/tasks.md).

## Validação de Mesas

CRUD conferido no navegador e PostgreSQL com tabelas temporárias, incluindo bloqueio por comanda aberta/encerrada. Build/lint aprovados e 151 testes HTTP dos três domínios aprovados. Resultados em [tarefas de Mesas](openspec/changes/archive/2026-11-26-gerenciar-mesas/tasks.md).

## Validação de Comandas e Pedidos

190 testes do backend aprovados nos cinco domínios. Consultas, totais, preços históricos e transições de status conferidos com PostgreSQL em tabelas temporárias. No navegador foram verificados detalhes, alteração e retorno de status, falha com nova tentativa, persistência após recarregamento e layout móvel. A migração `DELIVERY` → `DELIVERED` foi aplicada ao banco do projeto e sua segunda execução não fez alterações. Não havia pedidos nesse banco no momento da migração; a preservação de pedidos legados foi exercitada no ambiente temporário.

## Kanban de pedidos

Acesse **Pedidos · Kanban** no menu (`/orders`). O quadro lista todos os pedidos em Novo, Em preparo, Pronto e Entregue, com mesa, itens, horário e total. Arraste pela alça do cartão ou use o seletor “Mover para” (alternativa por teclado e em telas pequenas).

Cada movimento executa a mutation de status na API e invalida as consultas de pedidos/comandas. O cartão só muda após confirmação; falhas mantêm a posição anterior. Recarregar consulta novamente o status persistido. Soltar fora de uma coluna ou na mesma coluna não grava alterações.

Dependência adicional: `@dnd-kit/core`, para arrastar e soltar com mouse e toque, áreas de destino e prévia do cartão. Referência: [documentação do DndContext](https://dndkit.com/legacy/api-documentation/context-provider/dnd-context/).
