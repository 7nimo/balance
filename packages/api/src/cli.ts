import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseModule } from './core/database/database.module';
import { SeederService } from './core/database/seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const command = process.argv[2];
  const seederService = app.select(DatabaseModule).get(SeederService);

  switch (command) {
    case 'currency':
      await seederService.currency();
      break;
    case 'banks':
      await seederService.banks();
      break;
    default:
      console.log('Command not found');
      process.exit(1);
  }

  await app.close();
  process.exit(0);
}

bootstrap();
