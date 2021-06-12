import { Injectable } from '@nestjs/common';
import { registerWithEureka } from 'playonomics-lib';

@Injectable()
export class AppService {
  onApplicationBootstrap() {
    if (process.env.REGISTER_WITH_EUREKA as unknown as boolean) {
      this.registerWithEurekaDiscovery();
    } else {
      console.log(`REGISTER_WITH_EUREKA set to false, ignoring`);
    }
  }
  private registerWithEurekaDiscovery() {
    registerWithEureka(
      process.env.APP_NAME as string,
      process.env.PORT as string,
      process.env.EUREKA_URI as string,
      process.env.HOST_NAME as string,
      process.env.ENABLE_HEART_BEAT as unknown as boolean,
    );
  }
  getHealthCheck(): string {
    return 'Playonomics Cart and Order Services OK!';
  }
}
