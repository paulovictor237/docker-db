// npm init -y
// npm i -D typescript @types/node tsx tsup
// npx tsc --init
// npx prisma init

// 1. docker compose up -d
// 2. npx prisma migrate dev
// 3. npx prisma studio
// 4. npm run dev

import { fastify } from "fastify";
import { PrismaClient } from "@prisma/client";
import z from "zod";

const app = fastify();

const prisma = new PrismaClient();

app.get("/users", async () => {
  const users = await prisma.user.findMany();
  return { users };
});

app.post("/users", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });
  const { name, email } = createUserSchema.parse(request.body);
  await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return reply.status(201).send();
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? +process.env.PORT : 3333,
  })
  .then(() => {
    console.log("HTTP Server Running");
  });
