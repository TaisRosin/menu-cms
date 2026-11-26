# Why

Concluir RF06–RF09: consultar comandas abertas, detalhes e itens de pedidos e persistir alterações de status.

# What Changes

- GET /guest-checks retorna somente OPENED com mesa, abertura e total calculado.
- GET /guest-checks/:id inclui mesa e total; GET /orders aceita guestCheckId e carrega itens/produtos.
- PATCH /orders/:id/status valida quatro status e permite transições livres.
- Preservar registros ao renomear enum DELIVERY para DELIVERED.
- Implementar páginas reais e roteiro de validação final.

# Capabilities

## New Capabilities
- comandas-pedidos: consulta de comandas e acompanhamento de pedidos.

## Modified Capabilities
- navegacao-cms: substituir os últimos avisos de implementação pendente.

# Impact

CMS, módulos guest-checks/orders e enum PostgreSQL. Sem dependências novas. CMS não cria/fecha comandas nem altera itens, quantidades ou preços.
