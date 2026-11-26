## ADDED Requirements

### Requirement: Listagem administrativa
O CMS SHALL listar imagem, nome, categoria, preço BRL, situação, vegetariano e novidade, com filtro por categoria e estados de carregamento, falha, vazio e imagem indisponível.

#### Scenario: Produto inativo
- **WHEN** o CMS consulta produtos
- **THEN** ativos e inativos aparecem, mantendo somente ativos na consulta padrão do cardápio

### Requirement: Cadastro e edição
O CMS SHALL validar os campos e persistir todos os dados através da API, preservando o formulário após erro e bloqueando submissões pendentes.

#### Scenario: Vínculo com categoria
- **WHEN** um produto recebe nova categoria
- **THEN** a categoria deve existir e estar ativa, sendo permitido remover ou preservar o vínculo atual

#### Scenario: Valores inválidos
- **WHEN** o nome estiver vazio ou maior que 60, o preço não for positivo com até duas casas, ou a imagem não for URL HTTP(S)
- **THEN** o formulário rejeita o envio e a API também rejeita gravações inválidas

#### Scenario: Edição parcial
- **WHEN** uma atualização omite campos ou envia null para imagem, descrição ou categoria
- **THEN** os omitidos permanecem e os campos anuláveis enviados como null são removidos

### Requirement: Exclusão confirmada
O CMS SHALL identificar o produto na confirmação e informar o resultado, atualizando a lista após sucesso.

#### Scenario: Produto usado em pedido
- **WHEN** a exclusão encontra vínculo com item de pedido
- **THEN** a API retorna 409 e preserva produto e item

### Requirement: Compatibilidade
A adequação SHALL preservar registros e o contrato de leitura do cardápio.

#### Scenario: Colunas adicionais
- **WHEN** vegetarian e isNew forem adicionadas
- **THEN** registros existentes recebem false sem alteração dos demais campos
