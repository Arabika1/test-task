import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthDisable } from './auth.decorator';
import { ILogin } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AuthDisable()
  @Post('login')
  private async login(@Body() data: LoginDto): Promise<ILogin> {
    return this.authService.login(data);
  }
}
