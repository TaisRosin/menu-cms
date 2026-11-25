# Spec Delta

## Purpose

Permitir que quem desenvolve o CMS instale e execute a aplicação localmente, configurando a API sem alterar o código.

## ADDED Requirements

### Requirement: Instalação e execução documentadas
O projeto SHALL fornecer instruções de pré-requisitos, instalação com `npm install`, configuração do ambiente e execução com `npm run dev`, além de justificar as dependências adicionadas fora da stack obrigatória.

#### Scenario: Preparação de uma cópia do repositório
- **GIVEN** os pré-requisitos indicados no README estão disponíveis
- **WHEN** a pessoa segue as instruções de instalação e configuração e executa `npm run dev`
- **THEN** a aplicação fica acessível no endereço informado pelo servidor de desenvolvimento

### Requirement: Endereço da API configurável
O CMS SHALL obter o endereço da API de `VITE_API_URL`, sem exigir edição de código, e fornecer `.env.example` sem credenciais.

#### Scenario: Ambiente configurado
- **WHEN** uma URL HTTP ou HTTPS válida é definida em `VITE_API_URL` antes de iniciar a aplicação
- **THEN** o cliente HTTP utiliza esse endereço como base para futuras operações, sem fazer consultas operacionais nesta etapa

#### Scenario: Configuração ausente ou inválida
- **WHEN** a aplicação inicia sem `VITE_API_URL` ou com valor que não seja uma URL HTTP ou HTTPS válida
- **THEN** exibe orientação para configurar a variável e reiniciar o servidor, sem enviar requisições a um endereço alternativo

### Requirement: Arquivos locais fora do versionamento
O repositório SHALL excluir do versionamento arquivos de ambiente privados, dependências instaladas e saída de build, mantendo o exemplo de ambiente versionável.

#### Scenario: Arquivos gerados no ambiente local
- **WHEN** existem `.env`, `node_modules`, `dist` e `.env.example` na cópia local
- **THEN** os três primeiros são ignorados pelo Git e `.env.example` pode ser incluído no repositório
