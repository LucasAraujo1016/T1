# Sistema de Agenda de Clientes - Grupo World Beauty (WB)

## Sobre o Projeto

Este sistema foi desenvolvido para o Grupo World Beauty (WB) com o objetivo de facilitar o cadastro, atualização, consulta e análise de clientes, produtos e serviços de cada unidade do grupo. O sistema é totalmente operado por linha de comando (CLI), sem interface gráfica, e cada unidade possui sua própria base de dados.

---

## Funcionalidades

- **CRUD de Clientes:** Cadastro, atualização, listagem e exclusão de clientes.
- **CRUD de Produtos:** Cadastro, atualização, listagem e exclusão de produtos.
- **CRUD de Serviços:** Cadastro, atualização, listagem e exclusão de serviços.
- **Registro de Consumo:** Associação de produtos e serviços consumidos por cada cliente.
- **Listagens Especiais:**
  - Top 10 clientes que mais consumiram (quantidade)
  - Top 10 clientes que menos consumiram (quantidade)
  - Top 5 clientes que mais consumiram em valor
  - Listagem geral dos produtos/serviços mais consumidos
  - Listagem dos mais consumidos por gênero
  - Listagem de clientes por gênero

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/) (instale globalmente com `npm install -g typescript`)
- [ts-node](https://typestrong.org/ts-node/) (instale globalmente com `npm install -g ts-node`)

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/LucasAraujo1016/T1.git
   cd <PASTA_DO_PROJETO>
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

---

## Como Popular os Dados de Teste

O projeto já possui scripts para popular automaticamente os arquivos de clientes, produtos e serviços.

1. **Popule os serviços:**
   ```bash
   npx ts-node src/utils/popularServicos.ts
   ```

2. **Popule os produtos:**
   ```bash
   npx ts-node src/utils/popularProdutos.ts
   ```

3. **Popule os clientes (com produtos e serviços aleatórios):**
   ```bash
   npx ts-node src/utils/popularClientes.ts
   ```

---

## Como Executar o Sistema

Execute o sistema principal com:

```bash
npx ts-node src/app/main.ts
```

---

## Como Utilizar

Ao iniciar, o sistema apresenta o menu principal:

- **1 - Gerenciar Clientes:**  
  - Cadastrar, atualizar, excluir e listar clientes.
  - Listagens especiais de clientes (por gênero, top consumidores, etc).

- **2 - Gerenciar Produtos:**  
  - Cadastrar, atualizar, excluir e listar produtos.

- **3 - Gerenciar Serviços:**  
  - Cadastrar, atualizar, excluir e listar serviços.

- **4 - Listagem mais consumidos:**  
  - Listagem geral dos produtos/serviços mais consumidos.
  - Listagem dos mais consumidos por gênero.

- **0 - Sair:**  
  - Encerra o sistema.

**Obs:**  
Durante o cadastro e atualização, a associação de produtos e serviços é feita digitando o nome (não sensível a maiúsculas/minúsculas).

---

## Observações Finais

- Todos os dados são salvos em arquivos `.json` na pasta `data`.
- O sistema foi testado com pelo menos 30 clientes e 20 produtos, conforme solicitado.
- Para dúvidas ou problemas, consulte o código-fonte ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido para o Grupo World Beauty (WB) - 2025**# T1
