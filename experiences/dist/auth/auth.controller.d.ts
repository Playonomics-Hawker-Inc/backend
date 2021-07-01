import { LoginDTO } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { User as UserDocument } from '../user/types/user';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(userDTO: LoginDTO): Promise<{
        token: any;
    }>;
    me(user: any): Promise<UserDocument>;
}
