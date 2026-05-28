"use strict";
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const { defineConfig } = require("prisma/config");
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
const directUrl = process.env.DIRECT_URL;
const datasourceConfig = { url: databaseUrl };
if (directUrl) {
    datasourceConfig.directUrl = directUrl;
}
module.exports = defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    
});
