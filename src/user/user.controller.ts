import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {

    constructor(private userService: UserService) { }

    @Get('api/users')
    showAllUsers () {
        return this.userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login (@Body() data: UserDTO) {
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register (@Body() data: UserDTO) {
        return this.userService.register(data);
    }


}
