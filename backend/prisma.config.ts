import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'prisma/config';

config({ path: resolve(__dirname, '.env') });

const databaseUrl = process.env.DATABASE_URL ?? 'file:./prisma/dev.db';
const directUrl = process.env.DIRECT_URL;

const datasourceConfig: Record<string, string> = {
  url: databaseUrl,
};

if (directUrl) {
  datasourceConfig.directUrl = directUrl;
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: datasourceConfig,
});
