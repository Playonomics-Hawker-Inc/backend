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

    console.log('Got header', request.header('X-Session-Id'));
    if (!sessionId) {
      throw new HttpException(
        'X-Session-Id:  missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      // Store the user on the request object if we want to retrieve it from the controllers
      request['user'] = await this.sessionService.lookUpSession(sessionId);
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }

    //   try {
    //     // hard coding it now, will be picked up from a session service

    //     request['user'] = {
    //       _id: '609d803c132965c674526718',
    //       authorities: ['ADMIN'],
    //       email: 'pladmin@gmail.com',
    //       created: '2021-05-13T19:38:36.474Z',
    //     };
    //     return true;
    //   } catch (e) {
    //     throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    //   }
  }
}
