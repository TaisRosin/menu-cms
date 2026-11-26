# Tasks

## 1. Adequação da API

- [x] 1.1 Verificar repositório e ambiente antes de iniciar o servidor; manter os testes separados de dados operacionais.
- [x] 1.2 Adicionar ordem e validar DTOs; verificar cadastro inativo, edição parcial, remoção do ícone, dados inválidos e campos omitidos com testes focados.
- [x] 1.3 Implementar ordenação e exclusão por UUID; verificar respostas 204, 400, 404 e tradução de conflito para 409 com repositório simulado.
- [x] 1.4 Validar em PostgreSQL isolado a inclusão aditiva da coluna, preservação de categorias e vínculos, ordenação real e bloqueio de exclusão com produto ativo/inativo.
- [x] 1.5 Conferir visualmente a leitura pelo cardápio de referência com a API conectada ao banco.

## 2. Listagem de categorias

- [x] 2.1 Criar DTOs, service, hook e tabela; verificar ordem, ícone, situação e navegação em `/categories` através da API isolada.
- [x] 2.2 Conferir no navegador carregamento, erro com nova tentativa, vazio, ícone indisponível e apresentação em tela pequena.

## 3. Cadastro e edição

- [x] 3.1 Criar formulário compartilhado e validação local; verificar nome vazio/espaços, limite de caracteres, URL inválida e ordem negativa, fracionária, vazia ou fora do limite.
- [x] 3.2 Conectar mutations e invalidação; verificar cadastro ativo/inativo, edição dos campos, remoção do ícone, sucesso/erro, recarregamento e bloqueio de submissões enquanto pendente na API isolada.

## 4. Exclusão

- [x] 4.1 Implementar confirmação identificando a categoria; verificar cancelamento sem requisição, sucesso com lista atualizada e conflito simulado preservando a categoria.

## 5. Revisão do domínio

- [x] 5.1 Executar build e lint do CMS, testes isolados do backend e revisão no navegador; atualizar README e registrar resultados.
- [x] 5.2 Concluir a validação com PostgreSQL descrita em 1.4. Revisão visual de 1.5 concluída.

## Workflow follow-up

- Manter os commits anteriores da API e da listagem; registrar o restante da implementação de Categorias em um único commit.
- Push depende de aprovação; validação de integração concluída.
- Preparar Produtos em mudança própria após a revisão de Categorias.

## Validation

Validação isolada concluída em 26/11/2026:

- Build e lint do CMS aprovados; build do backend e lint do domínio de categorias aprovados.
- `npm test -- --runInBand --runTestsByPath src/cases/categories/category.spec.ts`: 56 testes aprovados, usando controller, pipe e service reais com repositório simulado, sem carregar AppModule ou PostgreSQL.
- Testes HTTP cobrem contrato de leitura, configuração da ordenação, cadastro, edição parcial/completa, remoção do ícone, limites e tipos, UUID, 204, 400, 404 e conversão do erro de chave estrangeira em 409.
- Navegador conectado temporariamente à API NestJS com repositório em memória: lista vazia, criação ativa/inativa, ordenação, edição, ícone ausente/quebrado, remoção do ícone, recarregamento, exclusão e mensagens de sucesso.
- Log HTTP confirmou os payloads, ícone removido com `null`, consultas após mutations e ausência de DELETE ao cancelar a confirmação.
- Falha temporária na edição manteve valores e diálogo abertos; nova tentativa teve sucesso. Durante o salvamento, campos e botões ficaram desabilitados. Falha de leitura exibiu erro e a nova tentativa recuperou a lista.
- Conflito 409 simulado exibiu a mensagem de vínculo e preservou a categoria. Isso não comprova integridade referencial real ou preservação de produtos no PostgreSQL.
- Formulário e tabela conferidos em largura de 390 px; tabela mantém rolagem horizontal e largura mínima para o nome.
- Nenhuma dependência adicionada; dados e servidor de teste são temporários, sem fixtures operacionais na aplicação.

Histórico da conexão:

- A tentativa de conexão ao PostgreSQL configurado retornou erro de tenant/usuário não encontrado. A validação prosseguiu somente com testes isolados.
- Na primeira rodada não houve sincronização do schema nem validação em PostgreSQL. O recarregamento no navegador usou a API em memória.
- Após reativação do Supabase, a conexão foi restabelecida. Resultados complementares abaixo.

## PostgreSQL — 26/11/2026

- Controller, ValidationPipe, service e repositório TypeORM reais exercitados via HTTP contra tabelas temporárias no PostgreSQL, copiadas da estrutura existente. A transação foi revertida e os dados de teste removidos.
- Aprovados cadastro ativo/inativo, ordenação, edição completa/parcial, remoção do ícone, validação 400, exclusão 204 e consulta 404.
- Chave estrangeira real impediu exclusão com produto ativo e inativo; a API retornou 409 e preservou categoria e produto.
- Inclusão aditiva de displayOrder testada com registro anterior. Depois, aplicada à tabela do projeto como integer NOT NULL DEFAULT 0, sem executar synchronize global. Comparação dos campos anteriores confirmou preservação dos cinco registros existentes.
- Service real leu as cinco categorias após commit da alteração. Nenhum produto existente foi alterado.
- Contrato do service/DTO do cardápio conferido no código. Revisão visual concluída: cinco categorias carregadas, produtos exibidos, filtro de Bebidas e recarregamento funcionando com PostgreSQL. API temporária somente de leitura, synchronize=false, sem alterações no menu-frontend.
- Observação da referência: o Vite bloqueou o arquivo da fonte Roboto Condensed instalado fora da pasta permitida. O navegador utilizou fonte alternativa; leitura e filtro funcionaram. Não foi alterado o projeto de referência.
