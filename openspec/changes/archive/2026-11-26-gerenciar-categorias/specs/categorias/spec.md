# Spec Delta

## Purpose

Permitir à equipe do restaurante consultar e administrar categorias reais do cardápio, preservando os produtos vinculados e informando os resultados das operações.

## ADDED Requirements

### Requirement: Listagem de categorias
O CMS SHALL listar categorias ativas e inativas da API com nome, ícone, ordem e situação, em ordem crescente de exibição, depois nome e identificador. Ordens iguais SHALL ser permitidas. Ícones ausentes ou indisponíveis SHALL ter representação neutra.

#### Scenario: Consulta bem-sucedida
- **WHEN** a consulta de categorias retorna registros
- **THEN** a tabela apresenta seus dados e ações de edição e exclusão na ordem definida, sem dados operacionais fixos

#### Scenario: Estados da consulta
- **WHEN** a consulta está pendente, falha ou retorna um array vazio
- **THEN** o CMS apresenta respectivamente carregamento, erro com opção de tentar novamente ou mensagem de nenhuma categoria cadastrada

### Requirement: Cadastro e edição
O CMS SHALL permitir cadastrar e editar nome, ícone opcional, ordem e situação, persistindo os valores na API. O cadastro SHALL iniciar com ordem 0 e situação ativa, permitindo alterar ambos. O identificador SHALL ser gerado pelo servidor e não editável.

#### Scenario: Cadastro inativo
- **WHEN** a pessoa preenche os dados válidos e salva uma categoria como inativa
- **THEN** a API persiste a situação escolhida e a categoria aparece na lista como inativa, inclusive após recarregar

#### Scenario: Edição completa
- **WHEN** a pessoa altera nome, URL do ícone, ordem e situação e salva
- **THEN** os novos valores persistem e a listagem reflete a nova ordenação

#### Scenario: Remoção do ícone
- **WHEN** a pessoa limpa o campo do ícone de uma categoria e salva
- **THEN** o ícone é removido e a categoria passa a exibir a representação neutra

### Requirement: Validação dos dados
CMS e API SHALL rejeitar nome vazio após aparar ou acima de 60 caracteres, ícone não vazio sem URL HTTP/HTTPS válida, ordem não inteira ou fora de 0 a 2147483647 e situação não booleana. A API SHALL rejeitar campos desconhecidos. O CMS SHALL informar erros antes do envio de um formulário inválido.

#### Scenario: Formulário inválido
- **WHEN** a pessoa tenta salvar com nome só de espaços, URL inválida ou ordem negativa, fracionária ou acima do limite
- **THEN** o CMS aponta o problema e não envia a gravação

#### Scenario: Requisição inválida direta
- **WHEN** uma requisição de gravação enviada diretamente à API viola as regras ou contém campos desconhecidos
- **THEN** a API retorna 400 sem persistir a alteração

### Requirement: Compatibilidade e atualização parcial
A API SHALL manter as consultas existentes e acrescentar `displayOrder` à categoria. Cadastro sem ordem ou situação SHALL usar 0 e ativo. PATCH SHALL preservar campos omitidos e aceitar `icon: null` para remover o ícone; os demais campos SHALL rejeitar null. Categorias existentes SHALL ser preservadas com ordem inicial 0.

#### Scenario: Cliente que não envia os novos campos
- **WHEN** um cliente cadastra uma categoria válida sem ordem ou situação
- **THEN** recebe a categoria com ordem 0 e situação ativa

#### Scenario: Edição parcial
- **WHEN** um cliente envia apenas um novo nome no PATCH
- **THEN** ícone, ordem e situação atuais permanecem inalterados

#### Scenario: Inclusão do campo em base existente
- **WHEN** a adequação é aplicada em uma base com categorias e produtos vinculados
- **THEN** os registros e vínculos permanecem e as categorias recebem ordem 0

### Requirement: Exclusão confirmada e proteção de vínculos
O CMS SHALL solicitar confirmação identificando a categoria antes de excluir. A API SHALL excluir por UUID somente categorias sem produtos vinculados; com vínculos, inclusive de produtos inativos, SHALL retornar 409 sem excluir ou desvincular registros.

#### Scenario: Cancelamento
- **WHEN** a pessoa cancela a confirmação
- **THEN** nenhuma requisição de exclusão é enviada e a categoria permanece

#### Scenario: Exclusão permitida
- **WHEN** a pessoa confirma a exclusão de categoria sem vínculos
- **THEN** a API retorna 204 e a categoria desaparece da lista após atualização

#### Scenario: Exclusão impedida por vínculo
- **WHEN** a pessoa confirma a exclusão de categoria vinculada a produto
- **THEN** recebe aviso compreensível do conflito e categoria e produto permanecem preservados

### Requirement: Resultado das gravações
O CMS SHALL notificar sucesso ou erro após cada gravação, atualizar as consultas afetadas após sucesso e impedir envio duplicado enquanto a operação estiver pendente. Em falhas, SHALL preservar os dados do formulário e não apresentar sucesso nem remover registros da lista.

#### Scenario: Gravação concluída
- **WHEN** cadastro, edição ou exclusão termina com sucesso
- **THEN** o diálogo fecha, a lista é atualizada e o CMS exibe confirmação

#### Scenario: Erro de gravação
- **WHEN** a API rejeita a operação ou fica indisponível
- **THEN** o CMS exibe erro, preserva as entradas quando houver formulário e permite tentar novamente

### Requirement: Identificadores inválidos ou inexistentes
A API SHALL retornar 400 para identificador que não seja UUID válido e 404 ao consultar, editar ou excluir uma categoria inexistente.

#### Scenario: Categoria removida por outra operação
- **WHEN** o CMS tenta editar ou excluir categoria que já não existe
- **THEN** a API retorna 404 e o CMS informa o erro sem declarar sucesso

#### Scenario: Identificador malformado
- **WHEN** uma consulta, edição ou exclusão por ID recebe identificador inválido
- **THEN** a API retorna 400 sem alterar registros
