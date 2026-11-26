## MODIFIED Requirements

### Requirement: Estado inicial sem operação simulada
Todas as páginas do CMS SHALL apresentar seus fluxos integrados à API, com estados de consulta reais e sem dados operacionais fictícios.

#### Scenario: Acesso a uma seção ainda não implementada
- **WHEN** a pessoa abre Comandas ou seus detalhes após esta etapa
- **THEN** encontra os fluxos implementados, sem aviso de implementação pendente

#### Scenario: Acesso à gestão de categorias
- **WHEN** a pessoa acessa /categories
- **THEN** encontra a gestão integrada à API

#### Scenario: Acesso à gestão de produtos
- **WHEN** a pessoa acessa /products
- **THEN** encontra a gestão integrada à API

#### Scenario: Acesso à gestão de mesas
- **WHEN** a pessoa acessa /spots
- **THEN** encontra a gestão integrada à API
