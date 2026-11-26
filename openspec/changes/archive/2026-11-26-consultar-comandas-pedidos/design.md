# Context

A API atual não lista comandas, não calcula total acumulado, não carrega relações dos pedidos e tem rota e persistência incorretas para status.

# Decisions

- Total acumulado obtido por SUM(order.total) no PostgreSQL, em consulta agrupada por IDs, retornado como string decimal. Comanda sem pedidos recebe 0. Sem coluna redundante.
- Listagem de comandas somente OPENED, com spot e createdAt, ordem de abertura/id. Detalhe direto também permite consultar comanda encerrada, identificada na tela.
- Pedidos com guestCheck, items.product, preço unitário histórico e subtotal persistido. Filtro guestCheckId validado como UUID. Não substituir preço histórico pelo preço atual do produto.
- Alterar somente a coluna status pelo repositório de pedidos, sem salvar em cascata itens carregados. Transições livres inclusive retornos e mesmo valor.
- NEW/Novo, PREPARING/Em preparo, READY/Pronto, DELIVERED/Entregue com badges distintos e rótulos textuais.
- Mutation por pedido com bloqueio pendente, erro preservando status anterior, feedback e invalidação de orders/guest-checks. Atualização automática a cada 30s e botão Atualizar.
- Migração transacional rename enum value, com timeout e comparação antes/depois. Sem synchronize global no banco existente durante validação.
- Testes HTTP isolados, PostgreSQL em tabelas temporárias e navegador; não criar dados de demonstração operacionais.

# Out of Scope

Abertura/fechamento de comandas, criação de pedidos pelo CMS, pagamentos, autenticação e edição de itens.
