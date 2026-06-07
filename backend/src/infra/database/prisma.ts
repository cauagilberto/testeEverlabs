import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

// Try to connect immediately so container startup shows DB connection issues early.
prisma
  .$connect()
  .then(() => console.log('Prisma: connected to database'))
  .catch((err) => console.error('Prisma connection error:', err.message || err));
