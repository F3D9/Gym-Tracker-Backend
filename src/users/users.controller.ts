import {  Controller, Get, Post, Put, Delete,Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dtos/user.dto';

@Controller('users')
export class UsersController {
     constructor(private readonly usersService: UsersService) {}
        
    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id:string) {
        return this.usersService.getUserById(Number(id));
    }

    @Post()
    async createUser(@Body() data: UserDto  ) {
        return this.usersService.createUser(data);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: UserDto ) {
        return this.usersService.updateUser(Number(id), data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }  
}
