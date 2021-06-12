import { HttpService, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SessionService {
  constructor(private httpService: HttpService) {}

  /**
   * Look up user session
   * @param id
   * @returns
   */
  async lookUpSession(id: string) {
    const session = await this.httpService.post(
      `${process.env.SESSION_END_POINT}` + `/me`,
      {
        id: id,
      },

      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const response = await lastValueFrom(session);
    return response.data;
  }
}
