import dbConfig from 'src/core/etc/database.config';
import multerConfig from 'src/core/etc/multer.config';
import swaggerConfig from 'src/core/etc/swagger.config';
import { ConfigFactory } from '@nestjs/config';

// type ConfigObject = Record<string, unknown>;
export interface ConfigObject<T> {
  [key: string]: () => T;
}
type ConfigObj<T> = Record<string, () => T>;

export function createConfiguration<T>(
  configObject: ConfigObj<T>,
): Array<ConfigFactory<T>> {
  const configArray: ConfigFactory<T>[] = [];

  for (const [key, config] of Object.entries(configObject)) {
    console.log(`${key}: ${config}`);

    configArray.push(config);
  }

  return configArray;
}

const configObject = {
  database: dbConfig,
  multer: multerConfig,
  swagger: swaggerConfig,
};

// const config = createConfiguration(configObject);

export const configuration = configObject;
// export const configuration = configObject;
