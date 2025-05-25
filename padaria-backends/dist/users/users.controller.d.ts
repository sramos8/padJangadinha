import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<any[]>;
    create(createUserDto: CreateUserDto): Promise<any>;
    update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
