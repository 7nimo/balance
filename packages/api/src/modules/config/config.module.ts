import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces';

export type moduleOptions = ConfigModuleOptions & ConfigOptions;

@Module({})
export class ConfigModule {
  static forRoot(options: moduleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
