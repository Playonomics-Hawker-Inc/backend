import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(private httpService: HttpService) {}

  /**
   * Make call to the authoriztion server to authorize the user sesssion
   * @param accessToken
   */
  async createSession(accessToken: string) {
    console.log('Create user session');
  }
}
