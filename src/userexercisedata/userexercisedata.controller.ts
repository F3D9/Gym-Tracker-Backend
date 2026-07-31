import {  Controller, Get, Post, Put, Delete,Body, Param } from '@nestjs/common';
import { UserExerciseDataDto } from './../dtos/userexercisedata.dto';
import { UserexercisedataService } from './userexercisedata.service';

@Controller('exercise-data')
export class UserexercisedataController {
    constructor( private readonly userExerciseDataService: UserexercisedataService) {}

    @Get()
    async getAllUserExerciseData() {
        return this.userExerciseDataService.getAllUserExerciseData();
    }

    @Get(':id')
    async getUserExerciseDataById(@Param('id') id: string) {
        return this.userExerciseDataService.getUserExerciseDataById(Number(id));
    }

    @Post()
    async createUserExerciseData(@Body() data: UserExerciseDataDto) {
        return this.userExerciseDataService.createUserExerciseData(data);
    }

    @Put(':id')
    async updateUserExerciseData(@Param('id') id: string, @Body() data: UserExerciseDataDto) {
        return this.userExerciseDataService.updateUserExerciseData(Number(id), data);
    }

    @Delete(':id')
    async deleteUserExerciseData(@Param('id') id: string) {
        return this.userExerciseDataService.deleteUserExerciseData(Number(id));
    }

}
