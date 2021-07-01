/// <reference types="node" />
import { Payload } from '../user/types/payload';
import { UserService } from '../user/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signPayload(payload: string | Buffer | object): Promise<any>;
    validateUser(payload: Payload): Promise<import("../user/types/user").User>;
}
