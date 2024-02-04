import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HEADER_AUTHORIZATION, IS_PUBLIC_KEY, targets } from './constants';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      targets(context),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers[HEADER_AUTHORIZATION];

    if (authorizationHeader) {
      const [type, jwtToken] = authorizationHeader.split(' ');

      if (!jwtToken || type !== 'Bearer') {
        throw new UnauthorizedException('Token not provided');
      }

      const account = await this.authService.authorizeAccount({ jwtToken });

      if (account) {
        return true;
      }

      return false;
    }
  }
}
