# Context

Seguir o domínio de Categorias e os repositórios independentes.

# Decisions

- GET /products mantém ativos como padrão; CMS envia includeInactive=true, combinável com categoryId UUID. Resposta inclui category e preço numérico ou string decimal do PostgreSQL.
- vegetarian e isNew são booleanos NOT NULL DEFAULT false. Não classificar registros existentes automaticamente.
- Nome após trim: 1–60 caracteres; preço 0,01–99.999.999,99, até duas casas; imagem opcional HTTP(S), description opcional. null remove imagem, descrição ou categoria; PATCH omitido preserva campos. Booleanos não aceitam null.
- Novo vínculo exige categoria ativa; vínculo existente com categoria agora inativa pode ser preservado ao editar outros campos. Categorias vêm da API, com erro e nova tentativa.
- Exclusão física por UUID retorna 204; vínculo com itens de pedido retorna 409 e preserva dados.
- UI usa tabela, select nativo estilizado no padrão shadcn, diálogos e switches existentes; mutations invalidam produtos. Sem abstração CRUD genérica.
- Testes HTTP isolados e PostgreSQL em tabelas temporárias; revisão visual em desktop/mobile. Aplicar somente as duas colunas aditivas após teste, sem synchronize global.

# Risks

O banco existente pode ter preços legados inválidos; validar novas gravações sem reescrever valores históricos. Não alterar menu-frontend.
