# Spec Delta

## Purpose

Oferecer navegação consistente entre as seções administrativas do CMS e acesso direto às suas páginas pelo endereço do navegador.

## ADDED Requirements

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
As páginas iniciais SHALL identificar a seção e informar que a funcionalidade ainda não foi implementada, sem apresentar dados operacionais fictícios ou controles que simulem gravações.

#### Scenario: Acesso a uma seção ainda não implementada
- **WHEN** a pessoa abre qualquer página administrativa nesta etapa
- **THEN** encontra o título e o aviso de implementação pendente, sem listagens ou totais fictícios

### Requirement: Endereço desconhecido
O CMS SHALL exibir aviso de página não encontrada e permitir retorno à seção de Categorias quando o endereço não corresponder às rotas disponíveis.

#### Scenario: Recuperação de navegação inválida
- **WHEN** a pessoa acessa uma rota desconhecida e utiliza o link de retorno
- **THEN** chega à página de Categorias
