import request from "request";
import ip from "ip";

const registerWithEureka = (
  appName: string,
  port: string,
  eurekaService: string,
  host: string,
  enableHeartBeat: boolean
) => {
  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${eurekaService}/apps/${appName}`,
      body: JSON.stringify({
        instance: {
          hostName: host,
          instanceId: `${appName}-${port}`,
          vipAddress: `${appName}`,
          app: `${appName.toUpperCase()}`,
          ipAddr: ip.address(),
          status: `UP`,
          port: {
            $: port,
            "@enabled": true,
          },
          dataCenterInfo: {
            "@class": `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
            name: `MyOwn`,
          },
        },
      }),
    },
    (error: any, response: Express.Response, body: any) => {
      if (!error) {
        console.log(`Registered with Eureka.`);

        if (enableHeartBeat) {
          setInterval(() => {
            request.put(
              {
                headers: { "content-type": "application/json" },
                url: `${eurekaService}/apps/${appName}/${appName}-${port}`,
              },
              (error: any, response, body) => {
                if (error) {
                  console.log("Sending heartbeat to Eureka failed.");
                }
              }
            );
          }, 50 * 1000);
        }
      } else {
        console.log(`Not registered with eureka due to: ${error}`);
      }
    }
  );
};

export { registerWithEureka };
