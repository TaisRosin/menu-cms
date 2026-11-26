# Validação final do CMS

## Executar

1. No `menu-backend`, instale com `npm install` e configure `.env` a partir de `.env.example`, usando a conexão do projeto. Não publique credenciais.
2. No banco existente do projeto, mantenha `DATABASE_SYNCHRONIZE=false`, execute `npm run migrate:order-status` e inicie com `npm run start:dev`.
3. No `cms`, execute `npm install`, configure `VITE_API_URL=http://localhost:3000` no `.env` e rode `npm run dev`. Abra o endereço informado pelo Vite.

O banco existente já recebeu as colunas de categorias/produtos e a migração de status. Para preparar um banco novo e vazio, consulte o README do backend.

## Conferência manual

- **Categorias:** cadastrar, editar nome/ícone/ordem/situação, cancelar uma exclusão e excluir uma categoria sem produtos. Uma categoria com produtos deve apresentar bloqueio compreensível.
- **Produtos:** filtrar por categoria, cadastrar e editar preço, imagem, categoria, situação e indicadores. Conferir preço inválido, reativação de inativo e confirmação de exclusão. Produtos em pedidos não podem ser excluídos.
- **Mesas:** cadastrar, editar e desativar; excluir uma mesa sem comandas e conferir bloqueio quando houver vínculo.
- **Comandas:** listar somente abertas, verificar mesa, data/hora e total; entrar nos detalhes e comparar itens, quantidades, preços e subtotais. Uma comanda sem pedidos mostra total zero.
- **Pedidos:** alternar entre Novo, Em preparo, Pronto e Entregue, inclusive no sentido inverso. Recarregar e conferir persistência. Itens, quantidades e preços permanecem iguais.
- **Navegação:** abrir URLs diretamente, recarregar, testar a largura do celular e conferir retorno da tela de detalhes. As consultas permitem atualizar e mostram erro quando a API está indisponível.

Comandas e pedidos são criados pelo fluxo do cardápio/API existente, não pelo CMS. Se não houver comandas abertas, a lista vazia é o resultado esperado; para validar pedidos manualmente, registre um pedido pelo fluxo existente. Alterações feitas no CMS conectado ao banco do projeto são reais.

## Evidências técnicas — 26/11/2026

- Build e lint do CMS aprovados; build e lint dos arquivos alterados do backend aprovados.
- 190 testes do backend aprovados, cobrindo os cinco domínios.
- Integração HTTP/PostgreSQL validada em tabelas temporárias com rollback: vínculos, totais, preços históricos, transições livres, rejeições e preservação dos demais campos.
- Navegador: detalhes com quatro status, alteração/retorno, falha de gravação e nova tentativa, persistência após recarregamento, endereço inválido e layout móvel.
- Migração do enum aplicada no banco do projeto; repetição idempotente confirmada. O banco não continha pedidos na aplicação da migração. Pedidos legados foram preservados na validação temporária.
- Nenhum dado operacional simulado é usado pelo CMS. A validação de mutações não inseriu registros de teste nas tabelas operacionais.

O build do Vite emite aviso de tamanho do bundle principal acima de 500 kB; a compilação termina com sucesso. A conferência manual do usuário complementa estas validações.
