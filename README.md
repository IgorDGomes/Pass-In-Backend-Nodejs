# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**. 

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [ ] O organizador deve poder cadastrar um novo evento;
- [ ] O organizador deve poder visualizar dados de um evento;
- [ ] O organizador deve poser visualizar a lista de participantes; 
- [ ] O participante deve poder se inscrever em um evento;
- [ ] O participante deve poder visualizar seu crachá de inscrição;
- [ ] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [ ] O participante só pode se inscrever em um evento uma única vez;
- [ ] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ ] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [ ] O check-in no evento será realizado através de um QRCode;

## Anotações

Métodos HTTP: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

Corpo da requisição (Request Body)
Parâmetros de busca (Search Params / Query Params) `http://localhost:5555/users?name=Name`
Parâmetros de rota (Route Params) -> Identificação de recursos `DELETE http://localhost:5555/users/5`
Cabeçalhos (Headers) -> Contexto

Semânticas = Significado

Driver nativo (Básico, escrito na mão, otimização SQL) / Query Builders (Knex.js, SQL com javascript) / ORMs (Automatiza vários processos do banco de dados ao mesmo tempo, versionamento do banco de dados)
Object Relational Mapping (Hibernate, Doctrine, ActiveRecord)
(Sequelize, Drizzle, Prisma)

JSON - Javascript Object Notation

20x -> Sucesso
30x -> Redirecionamento
40x -> Erro do cliente (Erro em alguma informação enviada por QUEM está fazendo a chamada para API)
50x -> Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado para o servidor)

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD

<img src=".github/erd.svg" width="600" alt="Diagrama ERD do banco de dados" />

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```












<!--
    npm i typescript @types/node -D
    npx tsc --init
    // npx tsc
    npm tsx -D
    // npx tsx src/server.ts
    // npx tsx watch src/server.ts
    // "scripts": {
    //     "dev": "tsx watch src/server.ts"
    // },
    npm i fastify
    npm i prisma -D
    npx prisma init --datasource-provider SQLite
    // "scripts": {
        // "dev": "tsx watch --env-file .env src/server.ts"
    // },
    npx prisma migrate dev
    npx prisma studio
    npm i zod
    npm i fastify-type-provider-zod
-->