import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import { PrismaClient } from "src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });