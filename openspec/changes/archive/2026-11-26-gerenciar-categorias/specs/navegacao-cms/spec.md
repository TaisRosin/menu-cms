# Spec Delta

## MODIFIED Requirements

### Requirement: Estado inicial sem operação simulada
As páginas ainda não implementadas SHALL identificar a seção e informar a implementação pendente, sem dados operacionais fictícios ou controles que simulem gravações. Categorias SHALL apresentar sua gestão integrada à API, substituindo o aviso inicial.

#### Scenario: Acesso a uma seção ainda não implementada
- **WHEN** a pessoa abre Produtos, Mesas, Comandas ou os detalhes de uma comanda nesta etapa
- **THEN** encontra o título e o aviso de implementação pendente, sem listagens ou totais fictícios

#### Scenario: Acesso à gestão de categorias
- **WHEN** a pessoa acessa `/categories` pelo menu ou diretamente
- **THEN** encontra a gestão de categorias com seu estado de consulta, sem o aviso de implementação pendente
