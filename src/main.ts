import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config  from './config/envs';
import * as moment from 'moment-timezone';


async function bootstrap() {
  const timezone = 'America/Chicago'; // Cambia a la zona horaria deseada
  process.env.TZ = timezone;
  moment.tz.setDefault(timezone);
  const app = await NestFactory.create(AppModule);
  
  await app.listen(config.APP_PORT);
}
bootstrap();
