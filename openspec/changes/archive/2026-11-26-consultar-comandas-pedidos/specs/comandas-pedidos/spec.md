## Purpose

Acompanhar comandas abertas e seus pedidos reais, permitindo atualizar o status de preparação e entrega.

## ADDED Requirements

### Requirement: Comandas abertas
O CMS SHALL listar apenas comandas OPENED, com mesa, data/hora de abertura, total acumulado e acesso aos detalhes.

#### Scenario: Comanda sem pedidos
- **WHEN** uma comanda aberta não tem pedidos
- **THEN** aparece com total zero e detalhe sem pedidos

#### Scenario: Comanda encerrada
- **WHEN** uma comanda está CLOSED
- **THEN** não aparece na lista de abertas, mas seu detalhe direto identifica a situação encerrada

### Requirement: Detalhes de pedidos
O CMS SHALL exibir somente os pedidos da comanda selecionada, incluindo produto, quantidade, preço unitário histórico, subtotal, total e status.

#### Scenario: Preço histórico
- **WHEN** o preço atual do produto difere do preço no item
- **THEN** a tela usa o preço persistido no item

#### Scenario: Comanda inexistente
- **WHEN** o endereço identifica uma comanda ausente
- **THEN** mostra erro compreensível e caminho de retorno, sem inventar pedidos

### Requirement: Status de pedido
A API SHALL aceitar NEW, PREPARING, READY e DELIVERED com transições livres e persistir somente o status do pedido.

#### Scenario: Retorno de status
- **WHEN** um pedido entregue é alterado para novo
- **THEN** a mudança é persistida sem alterar itens, valores ou vínculos

#### Scenario: Falha de atualização
- **WHEN** a API rejeita a alteração
- **THEN** a interface mostra erro e mantém o status confirmado anteriormente, permitindo nova tentativa

### Requirement: Feedback e atualização
O CMS SHALL distinguir carregamento, erro e vazio, permitir atualizar consultas e bloquear submissões duplicadas enquanto pendentes.

#### Scenario: Atualização concluída
- **WHEN** a mutation de status termina com sucesso
- **THEN** consultas afetadas são invalidadas e a tela informa sucesso

### Requirement: Compatibilidade do banco
A migração SHALL preservar pedidos existentes com DELIVERY, convertendo sua representação para DELIVERED sem alterar preços, itens ou vínculos.

#### Scenario: Pedido legado
- **WHEN** a migração é aplicada
- **THEN** um pedido anteriormente DELIVERY é lido como DELIVERED e conserva seus demais dados
