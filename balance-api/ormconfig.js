module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  seeds: ['dist/database/seeds/*.seed{.ts,.js}'],
  synchronize: true,
  // logging: ["query", "error"]
};
