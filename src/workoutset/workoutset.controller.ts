import {  Controller, Get, Post, Put, Delete,Body, Param } from '@nestjs/common';
import { WorkoutsetService } from './workoutset.service';
import { WorkoutSetDto } from '../dtos/workoutset.dto'

@Controller('workoutset')
export class WorkoutsetController {
    constructor(private readonly workoutService: WorkoutsetService) {}

    @Get()
    async getAllWorkoutsSets() {
        return this.workoutService.getAllWorkoutsSets();
    }

    @Get(':id')
    async getWorkoutSetsById(@Param('id') id:string) {
        return this.workoutService.getWorkoutSetById(Number(id));
    }

    @Post('workouts/:workoutId/sets')
    async createWorkoutSet(@Param('workoutId') workoutId: string,@Body() data: WorkoutSetDto) {
        return this.workoutService.createWorkoutSet(data,Number(workoutId));
    }

    @Put(':id')
    async updateWorkoutSet(@Param('id') id: string, @Body() data: WorkoutSetDto ) {
        return this.workoutService.updateWorkoutSet(Number(id), data);
    }

    @Delete(':id')
    async deleteWorkoutSet(@Param('id') id: string) {
        return this.workoutService.deleteWorkoutSet(Number(id));
    } 
}
