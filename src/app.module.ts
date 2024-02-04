import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import LoggerModule from 'src/core/logger/logger.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import CONFIG from '@application-config';
const { DATABASE } = CONFIG;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: DATABASE.MYSQL_HOST,
      port: parseInt(DATABASE.MYSQL_PORT),
      username: DATABASE.MYSQL_USER,
      password: DATABASE.MYSQL_PASSWORD,
      database: DATABASE.MYSQL_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    LoggerModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
