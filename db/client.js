const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL;

const client = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
  idleTimeoutMillis: 30000    
});

module.exports = client;
