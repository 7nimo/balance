import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/core/database/migrations/*{.ts,.js}'],
  subscribers: ['dist/**/subscribers/*.subscriber{.ts,.js}'],
  synchronize: true, // dev
  namingStrategy: new SnakeNamingStrategy(),
}));

// export function getConfig() {
//   return {
//     type: 'postgres',
//     host: process.env.POSTGRES_HOST,
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB,
//     entities: ['dist/**/entities/*.entity{.ts,.js}'],
//     migrations: ['dist/core/database/migrations/*{.ts,.js}'],
//     subscribers: ['dist/**/subscribers/*.subscriber{.ts,.js}'],
//     synchronize: true, // dev
//     namingStrategy: new SnakeNamingStrategy(),
//     autoLoadEntities: true,
//   } as DataSourceOptions;
// }
