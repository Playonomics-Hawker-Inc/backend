import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * Guard used for authenticated calls
 */
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const header = request.header('Authorization');

    console.log('Got header', request.header('Authorization'));
    if (!header) {
      throw new HttpException(
        'Authorization: Bearer <token> header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException(
        'Authorization: Bearer <token> header invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = parts[1];

    try {
      // hard coding it now, will be picked up from a session service

      request['user'] = {
        _id: '609d803c132965c674526718',
        authorities: ['ADMIN'],
        email: 'pladmin@gmail.com',
        created: '2021-05-13T19:38:36.474Z',
      };
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
