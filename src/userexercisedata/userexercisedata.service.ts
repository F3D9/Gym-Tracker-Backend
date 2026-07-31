import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserExerciseDataDto } from 'src/dtos/userexercisedata.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserexercisedataService {

    constructor(private prisma: PrismaService) {}

    async getAllUserExerciseData() {
        return this.prisma.userExerciseData.findMany();
    }

    async getUserExerciseDataById(id: number) {
        const userExerciseData = await this.prisma.userExerciseData.findUnique({
            where: { id: id },
        });
        if (!userExerciseData) throw new NotFoundException(`User Exercise Data ${id} not found`);
        return userExerciseData;
    }

    async createUserExerciseData(data: UserExerciseDataDto) {
        return this.prisma.userExerciseData.create({
            data
        });
    }

    async updateUserExerciseData(id: number, data: UserExerciseDataDto){
        return this.prisma.userExerciseData.update({
            where: { id: id, user_id: data.user_id },
            data
        });
    }

    async deleteUserExerciseData(id: number) {
        return this.prisma.userExerciseData.delete({
            where: { id: id }
        });
    }

}
