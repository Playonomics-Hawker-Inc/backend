import { HttpService, Injectable } from '@nestjs/common';
@Injectable()
export class SessionService {
  constructor(private httpService: HttpService) {}

  /**
   * Make call to the session service to create the user sesssion
   * @param accessToken
   */
  async createSession(user: any, token: string) {
    const response = await this.httpService
      .post(
        process.env.SESSION_END_POINT,
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          token: token,
          isActive: true,
          email: user.email,
          authorities: user.authorities,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .toPromise();

    console.log('session response', response);

    return response.data;
  }

  /**
   * Look up user session
   * @param id
   * @returns
   */
  async lookUpSession(id: string) {
    const response = await this.httpService
      .post(
        `${process.env.SESSION_END_POINT}` + `/me`,
        {
          id: id,
        },

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .toPromise();

    return response.data;
  }
}
