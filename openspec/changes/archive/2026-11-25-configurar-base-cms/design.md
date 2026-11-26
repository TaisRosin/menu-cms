# Design

## Context

Arquitetura aprovada para um CMS acadêmico, baseada no `menu-frontend`. Ver `docs/visao.md` para stack e versões de referência e `docs/requisitos.md` para regras e divergências da API.

## Goals / Non-Goals

**Goals:** estabelecer organização por domínio, configuração comum e navegação para as próximas mudanças.

**Non-Goals:** implementar CRUD, consultar comandas, alterar pedidos ou corrigir o backend nesta mudança.

## Decisions

- Manter `src/pages`, `src/cases/<domínio>/{dtos,services,hooks,components}`, `src/components/{layout,ui}` e `src/lib`. Criar arquivos de domínio quando necessários, sem classes-base ou camadas genéricas.
- Fluxo: página → hook → service → API. DTOs descrevem os contratos efetivos; os novos campos e endpoints serão definidos junto das adequações do domínio, não presumidos no CMS.
- Usar Vite, React, TypeScript, Tailwind e shadcn conforme a referência. React Router mantém a convenção existente; componentes visuais usam Base UI e Lucide conforme necessário. Justificar no README toda dependência fora da stack obrigatória, inclusive utilitários e ferramentas de desenvolvimento adicionados.
- `main.tsx` monta `QueryClientProvider` e `BrowserRouter`; `App.tsx` declara as rotas. Layout compartilhado com menu e conteúdo da rota. `/` redireciona para `/categories`; URLs desconhecidas exibem aviso e link de retorno.
- Rotas: `/categories`, `/products`, `/spots`, `/guest-checks` e `/guest-checks/:id`. Nesta mudança, cada página informa seu título e que a funcionalidade ainda não foi implementada, sem tabelas fictícias, indicadores ou contagens.
- `src/lib/axios.ts` exporta uma única instância com `baseURL` de `VITE_API_URL` e JSON válido. Ausência ou valor inválido da variável gera orientação visível para configurar o ambiente; não usar URL padrão silenciosa. `.env.example` fornece exemplo local sem segredo.
- Nos próximos domínios, consultas usam `useQuery` e gravações usam `useMutation` com invalidação das consultas afetadas. Estado de formulários e diálogos permanece em React, sem biblioteca adicional de estado ou formulários.
- Formulários compartilhados entre cadastro e edição, confirmação antes de excluir e avisos shadcn para feedback. Pedidos ficam nos detalhes da comanda. Esses componentes serão criados nas mudanças correspondentes.
- Instalar somente dependências necessárias e registrar o lockfile; não copiar `node_modules` nem atualizar os projetos de referência. O OpenSpec permanece ferramenta de desenvolvimento externa à aplicação.

## Risks / Trade-offs

- API ainda incompatível com o escopo → especificar e corrigir por domínio antes de conectar a funcionalidade correspondente; manter o cardápio funcionando.
- Páginas ainda sem operação → indicar claramente o estado de implementação, sem confundi-lo com lista vazia da API.
- Referência contém defeitos de configuração → reutilizar convenções, verificando JSON, imports, alias e execução local.

## Migration Plan

Não há dados a migrar nesta mudança. Validar instalação, build, lint e navegação antes da revisão. Publicação e commits permanecem separados e sujeitos à aprovação; eventual reversão deve ser limitada ao commit de configuração.
