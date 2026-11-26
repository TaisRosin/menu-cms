# Tasks

- [x] 1. Adequar entidade, DTOs, controller e service; validar HTTP e compatibilidade.
- [x] 2. Implementar listagem, filtro, estados e imagem alternativa.
- [x] 3. Implementar cadastro, edição, categoria e validações.
- [x] 4. Implementar confirmação e tratamento de exclusão com vínculo.
- [x] 5. Validar build/lint, testes HTTP, PostgreSQL e navegador; atualizar documentação.

## Validation

Validação em 26/11/2026:

- Build do CMS e backend aprovados; lint do CMS e do domínio products aprovado.
- 118 testes HTTP aprovados: 62 de Produtos e 56 de Categorias. Testes com controller/pipe/service reais e repositórios simulados, sem AppModule ou banco operacional.
- Testes HTTP com TypeORM e PostgreSQL em tabelas temporárias: cadastro, edição parcial/completa, preço decimal, indicadores, consulta padrão ativa, consulta administrativa e filtro por categoria, remoção de imagem/descrição/categoria, preservação de vínculo atual inativo, rejeição de novo vínculo inativo e respostas 400/404/204.
- Chave estrangeira real em tabela temporária de vínculo impediu exclusão e retornou 409, preservando produto e vínculo. A restrição order_item.product_id do banco existente também foi inspecionada e confirmada sem cascata.
- Navegador conectado à API com tabelas temporárias no PostgreSQL: vazio, cadastro inativo com indicadores, preço com vírgula, imagem quebrada com alternativa, filtro, edição/reativação, remoção de campos opcionais, recarregamento, cancelamento e exclusão.
- Nome vazio e preço zero rejeitados no formulário. Falha simulada de salvamento preservou campos; nova tentativa funcionou. Campos e botões desabilitados durante gravação. Erro de listagem e recuperação por nova tentativa conferidos.
- Formulário conferido em 390 px e layout desktop. A tabela mantém rolagem horizontal em tela pequena.
- Adição de vegetarian e isNew (boolean NOT NULL DEFAULT false) testada em cópia temporária antes de aplicar à tabela do projeto. Comparação dos campos anteriores confirmou preservação dos 39 produtos e seus vínculos. Leitura padrão, administrativa e filtrada pelo service real funcionou após commit da alteração.
- Transação temporária revertida ao encerrar a API de testes; arquivos e servidores temporários removidos. Nenhum dado operacional simulado no CMS, nenhuma dependência adicionada.
- Repositórios separados: um commit final para CMS e outro para backend. Push não incluído nesta etapa.
