import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import CONFIG from '@application-config';
import { PinoLogger } from 'nestjs-pino';
import { LoginDto } from './dto/login.dto';
import { AuthorizeAccountDto } from './dto/authorize-account.dto';
import { IAuthorizeAccount, ILogin } from './interfaces/auth.interface';

const {
  JWT: { APP_JWT_SECRET, APP_JWT_EXPIRATION },
} = CONFIG;

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  private async verifyJwt<T extends Record<string, unknown>>(
    token: string,
  ): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, {
        secret: APP_JWT_SECRET,
      });
    } catch (err: any) {
      this.logger.error(err);

      return null;
    }
  }

  async authorizeAccount(
    data: AuthorizeAccountDto,
  ): Promise<IAuthorizeAccount> {
    const payload = await this.verifyJwt(data.jwtToken);

    if (!payload) {
      throw new HttpException(
        { message: 'Token not provided' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const account = await this.userService.findOneBy({
      where: { email: payload.email },
    });

    if (!account) {
      throw new HttpException(
        { message: 'Token not provided' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      id: account.id,
      email: account.email,
    };
  }

  async login(payload: LoginDto): Promise<ILogin> {
    const account = await this.userService.findOneBy({
      where: { email: payload.email },
    });

    if (!account) {
      throw new HttpException(
        { message: `Account doesn't exists` },
        HttpStatus.FORBIDDEN,
      );
    }

    const jwtToken = await this.jwtService.signAsync(payload, {
      secret: APP_JWT_SECRET,
      expiresIn: APP_JWT_EXPIRATION,
    });

    return { jwtToken };
  }
}
