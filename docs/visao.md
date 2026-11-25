# Visão do CMS — Cardápio Digital

## Contexto e objetivo

O CMS permitirá que a equipe do restaurante administre o cardápio e acompanhe a operação, consumindo a API NestJS existente em `menu-backend`. O projeto acadêmico será desenvolvido na pasta existente `cms`, com repositório Git próprio, usando `menu-frontend` como referência.

## Escopo

- Cadastro, consulta, edição e exclusão de categorias, produtos e mesas.
- Consulta de comandas abertas e dos respectivos pedidos e itens.
- Alteração de status dos pedidos.
- Navegação administrativa, validação de formulários e feedback de carregamento, erro, lista vazia e resultado das operações.

Os critérios funcionais, as divergências encontradas e as decisões para adequação da API estão em [requisitos.md](requisitos.md). As adequações serão especificadas e implementadas nas etapas correspondentes.

## Restrições técnicas e referência existente

- Usar Vite, React, TypeScript, Tailwind CSS, shadcn/ui, Axios e TanStack Query, sem tecnologias ou abstrações desnecessárias.
- Referência do `menu-frontend/package.json`: Vite `^8.3.0`, React `^19.2.8`, TypeScript `~6.0.2`, Tailwind CSS `^4.3.3`, shadcn `^4.22.1`, Axios `^1.20.0` e TanStack Query `^5.104.1`. O projeto também usa React Router DOM `^7.18.5`, Base UI e Lucide.
- No lockfile, Vite resolve para `8.3.3`, React para `19.3.0` e TypeScript para `6.0.3`; as demais dependências acima resolvem para a versão base indicada. Esses dados são referência local, sem atualização de dependências nesta etapa.
- Seguir a organização observada: `src/pages`, `src/cases/<domínio>/{components,dtos,services,hooks}`, componentes compartilhados em `src/components` e utilitários em `src/lib`.
- Preservar o padrão de services com Axios, DTOs TypeScript e hooks por domínio. O frontend já utiliza `QueryClientProvider`, `BrowserRouter`, alias `@` para `src`, Tailwind pelo plugin do Vite e shadcn no estilo `base-vega`.
- Usar dados operacionais da API, sem mocks ou valores operacionais fixos. Regras detalhadas de acesso e atualização constam nos RNF.
- Backend como fonte de verdade; não inventar campos ou endpoints nem modificar projetos existentes sem autorização.

## Fora do escopo

- Criação, edição ou fechamento de comandas pelo CMS.
- Criação de pedidos ou edição de seus itens, quantidades e preços.
- Pagamentos, relatórios financeiros, autenticação e gestão de usuários.
- Upload de imagens: o contrato atual utiliza URLs.

## Processo e situação desta etapa

Desenvolvimento incremental com OpenSpec simplificado e revisão do usuário entre etapas: análise e documentação; arquitetura; especificações; configuração; implementação; validação final.

Análise, documentação inicial e arquitetura revisadas. A primeira mudança OpenSpec, `configurar-base-cms`, registra a arquitetura em `design.md`, os critérios de aceitação em `specs/` e as tarefas de configuração em `tasks.md`. A base foi implementada e validada, aguardando revisão do resultado. As funcionalidades serão especificadas incrementalmente por domínio. Não houve execução da API ou validação com banco de dados.

## Repositório e entrega

- Repositório independente e público no GitHub, com nome sugerido `menu-cms`.
- `README.md` com nome do projeto, instruções de instalação (`npm install`) e execução (`npm run dev`), configuração do ambiente e relação das dependências adicionadas fora da stack obrigatória, com justificativa individual. Se não houver dependências adicionais, informar isso explicitamente.
- `.env.example` com as variáveis necessárias, incluindo pelo menos `VITE_API_URL`.
- Histórico de commits frequentes que reflita a evolução real do projeto ao longo do bimestre. Um único commit ao final não atende ao requisito; não reconstruir artificialmente o histórico.

Commits devem ser pequenos, separados por documentação, configuração, funcionalidade ou correção, validados previamente e escritos em português no padrão Conventional Commits. Commits e pushes dependem de aprovação explícita. Não versionar `.env`, credenciais, `node_modules` ou arquivos desnecessários; disponibilizar `.env.example` na configuração.
