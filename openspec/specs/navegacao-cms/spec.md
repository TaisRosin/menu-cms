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
As páginas ainda não implementadas SHALL identificar a seção e informar a implementação pendente, sem dados operacionais fictícios ou controles que simulem gravações. Categorias e Produtos SHALL apresentar sua gestão integrada à API, substituindo o aviso inicial.

#### Scenario: Acesso a uma seção ainda não implementada
- **WHEN** a pessoa abre Mesas, Comandas ou os detalhes de uma comanda nesta etapa
- **THEN** encontra o título e o aviso de implementação pendente, sem listagens ou totais fictícios

#### Scenario: Acesso à gestão de categorias
- **WHEN** a pessoa acessa `/categories` pelo menu ou diretamente
- **THEN** encontra a gestão de categorias com seu estado de consulta, sem o aviso de implementação pendente

#### Scenario: Acesso à gestão de produtos
- **WHEN** a pessoa acessa /products pelo menu ou diretamente
- **THEN** encontra a gestão de produtos integrada à API, incluindo filtro e ações de cadastro, edição e exclusão

### Requirement: Endereço desconhecido
O CMS SHALL exibir aviso de página não encontrada e permitir retorno à seção de Categorias quando o endereço não corresponder às rotas disponíveis.

#### Scenario: Recuperação de navegação inválida
- **WHEN** a pessoa acessa uma rota desconhecida e utiliza o link de retorno
- **THEN** chega à página de Categorias
