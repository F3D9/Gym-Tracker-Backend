import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/dtos/user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
            
    async getAllUsers(){
        return this.prisma.user.findMany();
    }

    async getUserByEmail(email: string) {
        const users = await this.prisma.user.findMany({
            where: { email: email },
            take: 1
        });
        if (!users) throw new NotFoundException(`User ${email} not found`);
        return users[0];
    }

    async getUserById(id: number) {
        const users = await this.prisma.user.findUnique({
            where: { user_id: id },
        });
        if (!users) throw new NotFoundException(`User ${id} not found`);
        return users;
    }

    async createUser(data: UserDto) {
        return this.prisma.user.create({
            data
        });
    }

    async updateUser(id: number, data: UserDto){
        return this.prisma.user.update({
            where: { user_id: id },
            data
        });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({
            where: { user_id: id }
        });
    }
}
