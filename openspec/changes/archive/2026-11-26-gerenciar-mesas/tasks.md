# Tasks

- [x] 1. Conferir contrato, entidade e vínculo com comandas; definir escopo e critérios.
- [x] 2. Adequar DTOs, ValidationPipe, criação inativa, PATCH parcial, exclusão e conflito na API.
- [x] 3. Criar DTO/service/hooks e listagem de mesas no CMS.
- [x] 4. Implementar cadastro, edição e confirmação de exclusão.
- [x] 5. Validar HTTP, PostgreSQL isolado, build/lint e fluxos desktop/mobile.
- [x] 6. Atualizar documentação e encerrar a etapa.

## Estado

Implementação de Mesas concluída. Alterações locais prontas para revisão e versionamento.

## Validation

- Build do CMS e backend aprovados; lint do CMS e domínio spots aprovado.
- 151 testes HTTP aprovados: 33 de Mesas, 62 de Produtos e 56 de Categorias. Testes isolados sem AppModule ou conexão operacional.
- PostgreSQL: CRUD HTTP com repositório TypeORM real em tabela temporária; normalização de nome, criação inativa, edição parcial/completa, leitura e exclusão 204/404.
- FK real em tabela temporária bloqueou exclusão para comandas OPENED e CLOSED, retornando 409 e preservando mesa e vínculo. FK existente de guest-check.spot_id foi conferida sem cascata.
- Navegador: estado vazio, rejeição de nome vazio, cadastro inativo com trim, edição/reativação, nova leitura após recarregar, cancelamento e exclusão com atualização da lista. Interface conferida em desktop e 390 px.
- Nenhuma mudança de schema; operações de teste restritas a tabelas temporárias, revertidas ao encerrar a sessão. Sem dependências adicionais ou alteração do menu-frontend.
