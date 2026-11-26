# Design

## Context

Seguir a arquitetura aprovada da base e os requisitos RF02, RF09 e RF10. A API atual lista todas as categorias por nome, força cadastro ativo, ignora alterações do ícone e declara a exclusão como rota literal `id`.

## Goals / Non-Goals

**Goals:** concluir o domínio de categorias, mantendo os endpoints de leitura compatíveis com o cardápio.

**Non-Goals:** ordenar por arrastar, paginar, pesquisar, enviar arquivos, criar abstrações CRUD genéricas ou alterar outros domínios. A validação de preço de P09 fica para Produtos.

## Decisions

### Contrato alvo da API

Manter os endpoints existentes e corrigir somente o parâmetro da exclusão:

| Operação | Endpoint | Resultado |
|---|---|---|
| Listar | `GET /categories` | 200 com array de categorias ativas e inativas |
| Consultar | `GET /categories/:id` | 200 com categoria; 404 se inexistente |
| Cadastrar | `POST /categories` | 201 com categoria persistida |
| Editar | `PATCH /categories/:id` | 200 com categoria persistida |
| Excluir | `DELETE /categories/:id` | 204 sem corpo; 409 quando vinculada a produtos |

Resposta: `id: string`, `name: string`, `icon: string | null`, `active: boolean`, `displayOrder: number`.

- `name`: texto aparado, obrigatório no cadastro, de 1 a 60 caracteres após aparar; não permitir nome composto só de espaços. Não impor unicidade inexistente no requisito.
- `icon`: URL HTTP/HTTPS com protocolo, opcional; `null` remove o ícone. No formulário, campo vazio é enviado como `null`; omitir no PATCH preserva o valor atual. Não incluir upload.
- `active`: booleano, padrão `true` se omitido no cadastro; respeitar `false`. `null` é inválido.
- `displayOrder`: inteiro entre 0 e 2147483647, padrão 0 no cadastro. Coluna PostgreSQL `integer`, não nula, com padrão 0; sem índice adicional neste volume acadêmico. `null` é inválido.
- PATCH aceita os quatro campos opcionais e preserva os omitidos. IDs continuam gerados pelo servidor. Ordenar por `displayOrder ASC`, `name ASC`, `id ASC`; ordens repetidas são permitidas. Categorias existentes com ordem 0 conservam a ordenação alfabética relativa até edição.
- Aplicar `ValidationPipe` no controller de categorias, com transformação, whitelist e rejeição de propriedades desconhecidas, sem conversão implícita de booleanos ou números. Rejeitar dados inválidos com 400 e IDs desconhecidos com 404. A aplicação por domínio evita mudar a validação de outros fluxos nesta etapa.
- Exclusão física somente sem produtos vinculados, incluindo inativos. Traduzir a violação de chave estrangeira correspondente em 409 com mensagem compreensível; não apagar ou desvincular produtos automaticamente. Manter a restrição no banco como proteção contra concorrência.

### CMS

- `src/cases/categories/dtos/category.dto.ts`: resposta e tipos de criação/edição alinhados ao contrato alvo; `null` do ícone explícito.
- Service com `listAll`, `create`, `update` e `remove` pela instância `api`. Não criar operações não utilizadas pela tela.
- Hooks com chave `['categories']`, leitura via `useQuery` e uma `useMutation` por gravação. Invalidar categorias após sucesso; edição/exclusão também invalidam `['products']`, pois produtos carregam a categoria relacionada. Não usar atualização otimista.
- Página com tabela shadcn (nome, ícone, ordem, situação e ações); componentes de formulário e exclusão dentro do domínio. Usar os estados de carregamento, erro com tentativa novamente e lista vazia separadamente; não transformar falha da API em lista vazia.
- Um formulário em diálogo para cadastrar/editar nome, URL do ícone, ordem e situação. Valores iniciais de cadastro: nome e ícone vazios, ordem 0 e situação ativa. Validar antes de enviar, manter entradas em caso de erro, desabilitar envio repetido durante a gravação e fechar somente após sucesso ou cancelamento.
- AlertDialog para confirmação de exclusão identificando a categoria. Exibir avisos shadcn de sucesso/erro; manter o item quando houver falha. Imagem ausente ou com erro usa ícone neutro, sem substituir o dado persistido.
- Preservar navegação, responsividade e mensagens em português. Adicionar apenas componentes shadcn necessários, sem bibliotecas de formulário ou estado.

## Risks / Trade-offs

- Backend compartilhado com o cardápio → manter formato e campos atuais, acrescentar campo opcional nas entradas e verificar a leitura do cardápio após a mudança.
- Banco atualmente usa `synchronize: true` → antes de iniciar o backend alterado, identificar o ambiente de desenvolvimento e conferir a inclusão aditiva em base de teste; não executar sincronização em base desconhecida nem apagar registros. Não introduzir migração geral de infraestrutura nesta mudança.
- Ordem afeta também a listagem consumida pelo cardápio → comportamento esperado da ordem de exibição; usar nome como desempate conserva a apresentação inicial.
- Histórico do backend separado do CMS → verificar o repositório responsável antes de qualquer commit; não incorporar seus arquivos ao repositório `menu-cms`.

## Migration Plan

Validar contrato e preservação de registros em banco isolado antes da integração. Implementar primeiro a adequação da API e depois as partes do CMS. O campo novo tem padrão 0, sem reordenação automática ou perda de dados. Em eventual reversão do código, manter a coluna adicional para preservar a ordem já cadastrada. Commits e pushes continuam sujeitos à aprovação.
