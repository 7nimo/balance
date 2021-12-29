const SnakeNamingStrategy =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  seeds: ['dist/database/seeds/*.seed{.ts,.js}'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  logging: ['query', 'error'],
};
