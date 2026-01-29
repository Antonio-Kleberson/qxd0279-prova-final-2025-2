# Prova Final Prática – Desenvolvimento Fullstack

⏱ **Duração:** 2 horas

🎯 **Objetivo:** Avaliar a capacidade do aluno de compreender, evoluir e integrar uma aplicação fullstack existente, utilizando as tecnologias e práticas trabalhadas ao longo da disciplina.

---

## 📂 Estrutura do Repositório

O repositório fornecido contém **frontend e backend parcialmente implementados**. Nenhuma funcionalidade solicitada nesta prova deve ser criada do zero sem antes analisar o código existente.

```
prova-final-fullstack/
├── backend/    # API REST (Node.js + Express + TypeORM)
├── frontend/   # SPA (Vue 3 + Pinia + Vue Router)
└── README.md   # Este arquivo
```

Você deverá trabalhar **tanto no backend quanto no frontend**, conforme descrito no enunciado da prova.

---


## 📌 Contexto da Aplicação

A aplicação simula um **sistema de gerenciamento de projetos de extensão**, onde:

* Usuários podem se autenticar via JWT
* Existem diferentes **papéis de usuário** (`ADMIN`, `USER`)
* Projetos são armazenados em banco de dados SQLite

O backend **já possui autenticação JWT funcional**, porém os endpoints de listagem ainda são simples.
O frontend possui estrutura base com Vue Router e Pinia, mas **não implementa completamente o fluxo de autenticação nem paginação**.

---

## 🧩 Tarefas da Prova

### 🔹 PARTE A — Backend (40 pontos)

#### Tarefa A1 — Paginação (20 pts)

O endpoint abaixo já existe:

```
GET /api/projetos
```

Atualmente, ele retorna todos os projetos cadastrados.

Você deve modificá-lo para suportar **paginação**, utilizando os parâmetros de query:

* `page` (padrão: 1)
* `limit` (padrão: 10)

A resposta deve seguir o formato:

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 57,
    "totalPages": 6
  }
}
```

---

#### Tarefa A2 — Filtro e ordenação (20 pts)

Adicionar suporte opcional aos seguintes parâmetros:

* `search`: filtrar projetos por título ou descrição
* `sort`: campo de ordenação (ex: `titulo`, `createdAt`)
* `order`: `asc` ou `desc`

Exemplo:

```
GET /api/projetos?search=educacao&sort=createdAt&order=desc
```

---

### 🔹 PARTE B — Frontend (40 pontos)

#### Tarefa B1 — Autenticação JWT com Pinia (20 pts)

Implementar corretamente o fluxo de autenticação no frontend:

* Criar/ajustar a store `auth` usando Pinia
* Realizar login via backend
* Armazenar o token JWT no `localStorage`
* Restaurar a sessão ao recarregar a página
* Implementar logout

---

#### Tarefa B2 — Paginação no frontend (20 pts)

Na tela de listagem de projetos:

* Consumir o endpoint paginado do backend
* Implementar navegação entre páginas
* Atualizar os dados ao mudar de página

Não é necessário foco em layout ou design.

---

### 🔹 PARTE C — Autorização por Papel (20 pontos)

#### Tarefa C1 — Proteção de rotas no frontend (10 pts)

* Proteger a rota `/admin`
* Apenas usuários com papel `ADMIN` podem acessá-la
* Implementar proteção usando `Vue Router` e a store de autenticação

---

#### Tarefa C2 — Proteção de rotas no backend (10 pts)

* Implementar a restrição de acesso via middleware ao endpoint:

```
POST /api/dashboard
```

Apenas usuários com papel **autenticados** podem acessá-lo.

#### Tarefa C3 — Dashboard no frontend (10 pts)

* Implementar o dashboard de projetos no frontend
* Usuários `ADMIN` devem visualizar a quantidade total de projetos cadastros
* Usuários `ADMIN` e `USER` devem visualizar a lista de projeto que eles cadastraram

---

## ⚙️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

* Node.js **v18 ou superior**
* npm ou yarn

---

## ▶️ Executando o Backend

### 1. Acesse a pasta do backend

```
cd backend
```

### 2. Instale as dependências

```
npm install
```

### 3. Popule o banco de dados

```
npm run seed
```

> Caso o banco ainda não exista, ele será criado automaticamente utilizando SQLite.

### 4. Inicie o servidor

```
npm run dev
```

O backend será iniciado em:

```
http://localhost:3000
```

---

## ▶️ Executando o Frontend

### 1. Acesse a pasta do frontend

```
cd frontend
```

### 2. Instale as dependências

```
npm install
```

### 3. Inicie o servidor de desenvolvimento

```
npm run dev
```

O frontend estará disponível em:

```
http://localhost:5173
```

---

## 🔐 Usuários de Teste

O banco já possui usuários cadastrados para facilitar os testes:

| Papel | Email                                     | Senha  |
| ----- | ----------------------------------------- | ------ |
| ADMIN | [admin@teste.com](mailto:admin@teste.com) | 123456 |
| USER  | [user@teste.com](mailto:user@teste.com)   | 123456 |

---


## ✅ Critérios de Avaliação

| Critério                                 | Pontos  |
| ---------------------------------------- | ------- |
| Paginação, filtro e ordenação no backend | 40      |
| Autenticação JWT no frontend             | 20      |
| Paginação integrada no frontend          | 20      |
| Autorização por papel (front + back)     | 30      |
| **Total**                                | **110** |

Implementações **parciais**, porém funcionais, receberão pontuação proporcional.

---

## ⚠️ Observações Importantes

* O uso da **Composition API é obrigatório**
* Não é permitido uso de Vuex
* O código deve manter a organização em camadas
* Não serão avaliados aspectos visuais
* Critérios de boas práticas serão levados em consideração na pontuação

---

Boa prova! 🚀

