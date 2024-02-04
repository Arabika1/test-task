import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from '@application-config';
import { Logger } from 'nestjs-pino';
import { AuthGuard } from './modules/auth/guards/auth-guard';
const { APP_PORT } = CONFIG;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);
  app.setGlobalPrefix('api/v1');
  app.useGlobalGuards(app.get(AuthGuard));

  await app.listen(APP_PORT, () =>
    logger.warn(`Application listening on port: ${APP_PORT}`),
  );
}

(async () => bootstrap())();
