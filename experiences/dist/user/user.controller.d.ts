import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(query: any): Promise<import("./types/user").User[]>;
    getUserById(userId: string): Promise<{
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        type: string;
        address: string;
        phone: string;
        created: Date;
        authorities: [string];
    }>;
    removeUser(userId: string): Promise<string>;
}
