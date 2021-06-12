import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from '../../session/session.service';

/**
 * Guard used for authenticated calls
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const sessionId = request.header('X-Session-Id');

    if (!sessionId) {
      throw new HttpException(
        'X-Session-Id:  missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      // Store the user on the request object if we want to retrieve it from the controllers
      const response = await this.sessionService.lookUpSession(sessionId);
      request['user'] = response.session;
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
