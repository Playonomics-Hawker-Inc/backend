import { Injectable } from '@nestjs/common';
import { registerWithEureka } from 'playonomics-lib';

@Injectable()
export class AppService {
  onApplicationBootstrap() {
    this.registerWithEurekaDiscovery();
  }

  private registerWithEurekaDiscovery() {
    registerWithEureka(
      process.env.APP_NAME as string,
      process.env.PORT as string,
      process.env.EUREKA_URI as string,
      process.env.HOST_NAME as string,
      (process.env.ENABLE_HEART_BEAT as unknown) as boolean,
    );
  }
  getHealthCheck(): string {
    return 'Playonomics Experiences Services OK!';
  }
}
