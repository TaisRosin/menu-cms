# navegacao-cms Specification

## Purpose
Oferecer navegação consistente entre as seções administrativas do CMS e acesso direto às suas páginas pelo endereço do navegador.

## Requirements

### Requirement: Menu administrativo
O CMS SHALL apresentar menu com Categorias, Produtos, Mesas e Comandas, preservado durante a navegação e indicando a seção atual.

#### Scenario: Troca de seção
- **WHEN** a pessoa seleciona uma opção do menu
- **THEN** o endereço e o título da página correspondem à seção selecionada e o menu permanece disponível

### Requirement: Acesso por URL
O CMS SHALL permitir acesso direto a `/categories`, `/products`, `/spots`, `/guest-checks` e `/guest-checks/:id`; o endereço inicial `/` SHALL direcionar para `/categories`.

#### Scenario: Entrada inicial
- **WHEN** a pessoa acessa `/`
- **THEN** o navegador apresenta a página de Categorias em `/categories`

#### Scenario: Detalhe de comanda por endereço
- **WHEN** a pessoa acessa ou recarrega `/guest-checks/` seguido de um identificador
- **THEN** a aplicação apresenta a página de detalhes da comanda, mantendo Comandas como seção atual

#### Scenario: Histórico de navegação
- **WHEN** a pessoa usa voltar ou avançar após navegar entre seções
- **THEN** título, endereço e indicação do menu correspondem à página restaurada

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

### Requirement: Endereço desconhecido
O CMS SHALL exibir aviso de página não encontrada e permitir retorno à seção de Categorias quando o endereço não corresponder às rotas disponíveis.

#### Scenario: Recuperação de navegação inválida
- **WHEN** a pessoa acessa uma rota desconhecida e utiliza o link de retorno
- **THEN** chega à página de Categorias
