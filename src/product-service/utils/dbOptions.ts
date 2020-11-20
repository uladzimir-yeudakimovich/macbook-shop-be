// const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

export const dbOptions = {
  host: 'macbook-shop-instance.cwxgoujfdp8b.eu-west-1.rds.amazonaws.com',
  port: 5432,
  database: 'macbookshop',
  user: 'postgres',
  password: 'eL1S1tiNNtnHLg4jNoKq',
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}