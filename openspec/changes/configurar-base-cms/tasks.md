# Tasks

## 1. Projeto e ambiente

- [x] 1.1 Configurar Vite, React, TypeScript, Tailwind, shadcn, Axios e TanStack Query seguindo a referência; verificar instalação, scripts de build/lint e alias `@`.
- [x] 1.2 Adicionar `.gitignore` e `.env.example` com `VITE_API_URL`; verificar com `git check-ignore` que `.env`, `node_modules` e `dist` ficam excluídos e `.env.example` pode ser versionado.
- [x] 1.3 Configurar instância Axios e providers; verificar baseURL por ambiente e aviso visível para configuração ausente ou inválida, sem chamadas indevidas.
- [x] 1.4 Escrever README com nome, pré-requisitos, configuração, `npm install`, `npm run dev` e justificativas das dependências adicionais; conferir instruções contra os arquivos criados.

## 2. Navegação

- [x] 2.1 Criar layout, menu e páginas iniciais nas rotas do design; verificar navegação entre as quatro seções e ausência de dados operacionais fictícios.
- [x] 2.2 Configurar redirecionamento inicial, detalhe de comanda e rota desconhecida; verificar acesso direto, recarregamento, voltar/avançar e retorno pelo aviso de página inexistente.

## 3. Integração da base

- [x] 3.1 Executar build e lint e conferir os cenários das duas especificações no navegador; registrar resultado na revisão sem marcar testes não executados como aprovados.

## Workflow follow-up

- Implementação autorizada; solicitar revisão do resultado antes de arquivar a mudança.
- Após implementação e validação, solicitar aprovação para o commit `chore: configurar estrutura inicial do CMS`; push exige aprovação própria.
- Arquivar a mudança somente após implementação concluída e revisada.
- Preparar a próxima mudança de categorias, incluindo suas adequações do backend, antes de implementá-la.

## Validation

- `npm install`, `npm run build` e `npm run lint`: concluídos sem erros.
- `git check-ignore`: ambiente privado, dependências e build ignorados; `.env.example` versionável.
- Navegador: redirecionamento inicial, quatro seções, voltar/avançar, acesso direto e recarregamento do detalhe, retorno de rota inexistente e destaque da seção conferidos.
- Avisos de ambiente ausente e inválido conferidos no navegador; seis cenários do cliente Axios verificados sem rede, incluindo bloqueio de requisições e baseURL HTTP/HTTPS.
- Apresentação revisada em desktop e em largura de 390 px, sem rolagem horizontal; console sem avisos ou erros capturados.
- API e banco não foram exercitados: nenhuma funcionalidade operacional faz parte desta mudança.
