import { Model } from 'mongoose';
import { User } from '../user/types/user';
import { LoginDTO } from '../auth/dto/auth.dto';
import { Payload } from '../user/types/payload';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findByPayload(payload: Payload): Promise<User>;
    deleteUser(userId: string): Promise<void>;
    private getUser;
    login(userDTO: LoginDTO): Promise<User>;
    sanitizeUser(user: User): Promise<User>;
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
    getAll(query: any): Promise<User[]>;
    private getPaginatedResponse;
}
