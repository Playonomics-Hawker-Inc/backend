"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWithEureka = void 0;
var request_1 = __importDefault(require("request"));
var ip_1 = __importDefault(require("ip"));
var registerWithEureka = function (appName, port, eurekaService, host, enableHeartBeat) {
    request_1.default.post({
        headers: { "content-type": "application/json" },
        url: eurekaService + "/apps/" + appName,
        body: JSON.stringify({
            instance: {
                hostName: host,
                instanceId: appName + "-" + port,
                vipAddress: "" + appName,
                app: "" + appName.toUpperCase(),
                ipAddr: ip_1.default.address(),
                status: "UP",
                port: {
                    $: port,
                    "@enabled": true,
                },
                dataCenterInfo: {
                    "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                    name: "MyOwn",
                },
            },
        }),
    }, function (error, response, body) {
        if (!error) {
            console.log("Registered with Eureka.");
            if (enableHeartBeat) {
                setInterval(function () {
                    request_1.default.put({
                        headers: { "content-type": "application/json" },
                        url: eurekaService + "/apps/" + appName + "/" + appName + "-" + port,
                    }, function (error, response, body) {
                        if (error) {
                            console.log("Sending heartbeat to Eureka failed.");
                        }
                    });
                }, 50 * 1000);
            }
        }
        else {
            console.log("Not registered with eureka due to: " + error);
        }
    });
};
exports.registerWithEureka = registerWithEureka;
