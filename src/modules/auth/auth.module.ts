import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth-guard';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthGuard],
})
export class AuthModule {}
