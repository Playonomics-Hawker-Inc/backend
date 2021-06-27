import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (
      (user && user.authorities.includes('ADMIN')) ||
      user.authorities.includes('admin')
    ) {
      return true;
    }

    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
