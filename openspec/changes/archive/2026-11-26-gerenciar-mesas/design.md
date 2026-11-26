# Context

Contrato atual: Spot possui id UUID, name varchar(60) e active boolean. GET /spots já lista todas as situações. Criação força active=true; DELETE está declarado sem parâmetro dinâmico; não há ValidationPipe local. GuestCheck referencia Spot por spot_id obrigatório.

# Decisions

- Manter GET /spots com todas as situações e ordenar por nome/id; preservar contrato existente.
- POST recebe name obrigatório e active opcional (padrão true). PATCH parcial preserva omitidos. Nome com trim e 1–60 caracteres; null não permitido em nome/situação; campos desconhecidos rejeitados.
- Corrigir DELETE /spots/:id, com UUID válido, 204 no sucesso, 404 se ausente e 409 para vínculo com qualquer comanda, inclusive encerrada. Não apagar ou desvincular comandas.
- Mesa inativa pode ser editada/reativada; desativar mesa não altera comandas existentes.
- Reutilizar tabela, badges, diálogo, switch e avisos do CMS; DTO/service/hooks em cases/spots. Invalidação de spots após mutations.
- Verificar PostgreSQL em tabelas temporárias, sem criar comandas operacionais.

# Validation Plan

Testes HTTP para limites, null, booleanos, criação inativa, PATCH parcial, UUID e conflito. Build/lint, navegador desktop/mobile e teste de integridade com FK real.
