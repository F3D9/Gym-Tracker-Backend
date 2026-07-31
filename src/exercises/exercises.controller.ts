import {  Controller, Get, Post, Put, Delete,Body, Param } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseDto } from 'src/dtos/exercise.dto';

@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}
        
    @Get()
    async getAllExercise() {
        return this.exercisesService.getAllExercises();
    }

    @Get(':id')
    async getExerciseById(@Param('id') id:string) {
        return this.exercisesService.getExerciseById(Number(id));
    }

    @Post()
    async createExercise(@Body() data: ExerciseDto) {
        return this.exercisesService.createExercise(data);
    }

    @Put(':id')
    async updateExercise(@Param('id') id: string, @Body() data: ExerciseDto) {
        return this.exercisesService.updateExercise(Number(id), data);
    }

    @Delete(':id')
    async deleteExercise(@Param('id') id: string) {
        return this.exercisesService.deleteExercise(Number(id));
    }   
}
