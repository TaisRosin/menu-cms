# Requisitos do CMS

Os RF descrevem o resultado solicitado e implementado. A análise de compatibilidade abaixo é o diagnóstico histórico anterior às adequações; não representa o estado atual do backend. A conclusão está registrada ao final e no roteiro de validação.

## Requisitos funcionais

| ID | Requisito |
|---|---|
| RF01 | Navegar entre Categorias, Produtos, Mesas e Comandas. |
| RF02 | Listar categorias com nome, ícone, ordem de exibição e situação; cadastrar e editar todos os campos aplicáveis; excluir mediante confirmação. Ordem de exibição e limitações de gravação dependem de P01/P04/P05. |
| RF03 | Listar produtos com imagem, nome, categoria, preço em reais e indicadores de vegetariano e novidade; filtrar por categoria; cadastrar e editar todos os campos aplicáveis; excluir mediante confirmação. Dependências: P02/P04/P05/P06. |
| RF04 | Alimentar a seleção de categoria dos produtos pela API, respeitando a regra de vínculo com categoria ativa. |
| RF05 | Listar, cadastrar, editar e excluir mesas (`Spot`), com confirmação de exclusão. Campos atuais: nome e situação; limitações em P04/P05. |
| RF06 | Listar somente comandas `OPENED`, mostrando mesa, abertura e total acumulado; acessar seus pedidos. Dependência: P07. |
| RF07 | Exibir os pedidos de uma comanda, seus itens (produto, quantidade, preço unitário e subtotal), total e badge distinto por status. Dependência: P08. |
| RF08 | Alterar e persistir o status de um pedido, com transições livres entre Novo (`NEW`), Em preparo (`PREPARING`), Pronto (`READY`) e Entregue (`DELIVERED`). Dependência: P03. |
| RF09 | Exibir carregamento, erro e lista vazia em todas as consultas; notificar sucesso ou erro após cadastro, edição, exclusão e alteração de status. |
| RF10 | Validar campos obrigatórios, limites aplicáveis e preço maior que zero antes do envio; apresentar erros compreensíveis. |

## Requisitos não funcionais

- **RNF01 — Stack e organização:** seguir as tecnologias e os padrões do frontend registrados em `visao.md`, com páginas, componentes, DTOs, services e hooks separados por domínio.
- **RNF02 — HTTP:** uma única instância Axios, com `baseURL` obtida de `VITE_API_URL` no `.env`; endpoints nos services, sem URLs da API nos componentes. Disponibilizar `.env.example` sem credenciais.
- **RNF03 — Estado remoto:** todas as leituras via `useQuery`; todas as gravações via `useMutation`, com `invalidateQueries` nas consultas afetadas após sucesso.
- **RNF04 — Interface:** componentes shadcn/ui para tabelas, formulários, diálogos, selects, badges e avisos, estilizados com Tailwind; linguagem e apresentação consistentes e intuitivas.
- **RNF05 — Dados:** consumir exclusivamente dados operacionais reais da API; apresentar valores monetários em BRL, no formato brasileiro.
- **RNF06 — Simplicidade:** manter complexidade compatível com as aulas, sem novas bibliotecas ou abstrações desnecessárias. Não copiar defeitos identificados na referência.

## Regras de negócio

- **RN01 — Comandas:** o CMS apenas consulta. No fluxo de criação de pedidos, o backend reutiliza a comanda aberta da mesa ou cria uma; a criação exige mesa ativa e rejeita outra comanda aberta para a mesma mesa.
- **RN02 — Pedidos:** o backend registra preço unitário a partir do produto, calcula subtotal por quantidade e soma o total do pedido. O CMS não altera esses valores. O total acumulado da comanda deve refletir seus pedidos, mas ainda não é fornecido pela API.
- **RN03 — Status solicitado:** as quatro transições são livres, inclusive retornos a estados anteriores. Essa regra solicitada diverge do código atual (P03).
- **RN04 — Produtos:** categoria é opcional no modelo atual; quando informada, deve existir e estar ativa. O preço no CMS deve ser maior que zero e ter no máximo duas casas decimais; o DTO atual admite zero.
- **RN05 — Campos atuais:** categorias têm `name`, `icon` e `active`; produtos têm `name`, `description`, `price`, `picture`, `category` (enviada como `categoryId`) e `active`; mesas têm `name` e `active`. IDs são gerados pelo backend e não editáveis. Campos adicionais solicitados serão contemplados nas adequações P01/P02.
- **RN06 — Validações declaradas:** nomes são obrigatórios, com até 60 caracteres; ícone e imagem são URLs opcionais, sendo obrigatório protocolo na imagem. O DTO de atualização de produto exige `name`. Essas validações estão declaradas nos DTOs, mas sua execução pela API tem a limitação P09.

## Compatibilidade da API

Análise estática de entidades, DTOs, controllers e services em `menu-backend/src/cases`, e de `menu-backend/src/main.ts`. Os caminhos abaixo são relativos a `menu-backend/src`.

| ID | Evidência no código atual | Impacto / ponto para avaliação |
|---|---|---|
| P01 | `cases/categories/category.entity.ts` não possui campo de ordem; o service ordena por nome. | Não há como persistir ou exibir uma ordem configurável conforme solicitado. |
| P02 | `cases/products/product.entity.ts` e DTOs não possuem indicadores de vegetariano ou novidade. | Os indicadores não podem ser administrados com o contrato atual. |
| P03 | `cases/orders/entities/order-entity.ts` usa `DELIVERY`, não `DELIVERED`. O controller declara `@Patch('id/status')`, sem `:`, mas espera parâmetro UUID. O service define sequência obrigatória e compara `nextStatus[dto.status] != dto.status`, rejeitando todos os status do enum; além disso, usa o repositório de itens para salvar o pedido. | Alteração de status está bloqueada; nomenclatura e transições divergem do solicitado. |
| P04 | Controllers de categorias, produtos e mesas declaram `@Delete('id')`, sem `:`, mas exigem `@Param('id', ParseUUIDPipe)`. | Exclusão por identificador não funciona pela rota esperada. |
| P05 | Criação de categorias, produtos e mesas força `active: true`; categoria e mesa não recebem `active` no DTO de criação. Atualização de categoria aceita `icon` no DTO, mas o service não o aplica. | Cadastro direto como inativo e edição do ícone não são atendidos. |
| P06 | `cases/products/product.service.ts` lista somente `active: true`, sem opção de incluir inativos. | Um produto desativado desaparece da listagem e não pode ser localizado ali para reativação. |
| P07 | `cases/guest-checks/guest-check.controller.ts` possui consulta somente por ID, sem listagem. `findOne` não carrega `spot`; a entidade não tem total acumulado. | Faltam dados para listar comandas abertas com mesa e total. O método interno de busca por mesa não está exposto como endpoint. |
| P08 | `cases/orders/order.service.ts` lista e consulta pedidos sem carregar `guestCheck`, `items` ou `items.product`; não há filtro de comanda no controller, nem relações eager nas entidades. | Não é possível associar os resultados às comandas nem exibir os itens completos pelas consultas atuais. |
| P09 | Não foi encontrado `ValidationPipe` global ou local em `src`; os DTOs de preço usam `@Min(0)`. | Não presumir validação automática dos DTOs; o CMS deve cumprir a exigência explícita de preço positivo. |

O CRUD possui consultas, cadastro e atualização em `/categories`, `/products` e `/spots`; produtos aceitam filtro `categoryId`. As limitações acima impedem considerar o contrato suficiente para o CMS completo. As exclusões usam remoção física e não há tratamento específico de vínculos existentes; mensagens e comportamento para registros referenciados também precisam ser validados na integração.

**Referência frontend:** já há DTOs, services e hooks de leitura para categorias, produtos e mesas, mas não há fluxo de mutações ou telas de comandas e pedidos. A instância Axios usa `VITE_API_URL`, porém declara `Content-Type: aplication/json` (grafia incorreta). As telas atuais não tratam integralmente carregamento, erro e vazio; esses padrões não atendem por si só a RF09.

## Decisões para implementação

- **P01/P02:** contemplar na API a ordem de exibição das categorias e os indicadores de vegetariano e novidade dos produtos, mantendo o escopo solicitado. Definir o contrato nas especificações antes de implementar.
- **P03:** adotar `DELIVERED` conforme RF08, permitir transições livres entre os valores válidos, corrigir o parâmetro da rota e salvar pelo repositório de pedidos. Preservar eventuais registros existentes com `DELIVERY` na adequação dos dados.
- **P04:** corrigir os parâmetros dinâmicos das três rotas de exclusão.
- **P05:** permitir informar a situação no cadastro, mantendo ativo como padrão quando omitida, e persistir a edição do ícone da categoria.
- **P06:** permitir consultar produtos inativos no CMS, preservando a listagem padrão de produtos ativos usada pelo cardápio.
- **P07/P08:** disponibilizar consulta de comandas abertas com mesa, consulta dos pedidos por comanda e carregamento de itens e produtos. Calcular o total acumulado a partir dos totais dos pedidos, sem armazenar um total redundante na comanda. O contrato será definido nas especificações.
- **P09:** aplicar as validações dos DTOs na API e exigir preço positivo também no backend; manter a validação dos formulários do CMS.

As correções preservam a consulta padrão do cardápio. No CMS, o cabeçalho JSON e os estados de consulta seguem RF09.

## Conclusão das adequações

P01 a P09 foram implementados: ordem e indicadores persistidos; rotas corrigidas; situação no cadastro; edição do ícone; consulta opcional de inativos; comandas abertas com mesa e total calculado; pedidos filtrados com itens; quatro status livres; validação de DTOs e preço positivo. A API usa `DELIVERED`, com migração idempotente do enum legado. As observações de RN02–RN06 sobre limitações anteriores devem ser lidas como histórico: o contrato vigente está nas especificações em `openspec/specs`.

Builds, lint e 190 testes passaram. Integração e mutações foram verificadas com tabelas temporárias no PostgreSQL, sem inserir dados de teste na operação. Consulte [validacao-final.md](validacao-final.md) para conferir a entrega.
