## MODIFIED Requirements

### Requirement: Estado inicial sem operação simulada
As páginas ainda não implementadas SHALL informar implementação pendente, sem dados fictícios. Categorias, Produtos e Mesas SHALL apresentar gestão integrada à API.

#### Scenario: Acesso a uma seção ainda não implementada
- **WHEN** a pessoa abre Comandas ou seus detalhes nesta etapa
- **THEN** encontra o título e aviso de implementação pendente

#### Scenario: Acesso à gestão de categorias
- **WHEN** a pessoa acessa /categories pelo menu ou diretamente
- **THEN** encontra a gestão de categorias com seu estado de consulta, sem o aviso de implementação pendente

#### Scenario: Acesso à gestão de produtos
- **WHEN** a pessoa acessa /products pelo menu ou diretamente
- **THEN** encontra a gestão de produtos integrada à API, incluindo filtro e ações de cadastro, edição e exclusão

#### Scenario: Acesso à gestão de mesas
- **WHEN** a pessoa acessa /spots pelo menu ou diretamente
- **THEN** encontra a gestão de mesas integrada à API, sem aviso de implementação pendente
