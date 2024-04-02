import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = fastify()

const prisma = new PrismaClient({
    log: ['query'],
})

/*
Métodos HTTP: GEt, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ...

Corpo da requisição (Request Body)
Parâmetros de busca (Search Params / Query Params) `http://localhost:5555/users?name=Name`
Parâmetros de rota (Route Params) -> Identificação de recursos `DELETE http://localhost:5555/users/5`
Cabeçalhos (Headers) -> Contexto

Semânticas = Significado

Driver nativo (Básico, escrito na mão, otimização SQL) / Query Builders (Knex.js, SQL com javascript) / ORMs (Automatiza vários processos do banco de dados ao mesmo tempo, versionamento do banco de dados)
Object Relational Mapping (Hibernate, Doctrine, ActiveRecord)
(Sequelize, Drizzle, Prisma)

*/

app.post('/events', async (request, reply) => {
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    })

    const data = createEventSchema.parse(request.body)

    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toISOString(),
        }
    })

    return reply.status(201).send({ eventId: event.id })
})

app.listen({ port: 3333 })
    .then(() => {
        console.log("HTTP server running!")
    })