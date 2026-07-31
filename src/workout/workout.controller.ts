import {  Controller, Get, Post, Put, Delete,Body,UseGuards, Param, Request } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutDto } from '../dtos/workout.dto'
import { AuthGuard } from 'src/auth/auth.guards';

@UseGuards(AuthGuard)
@Controller('workout')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService) {}
            
    @Get()
    async getAllWorkouts() {
        return this.workoutService.getAllWorkouts();
    }

    @Get('/user')
    async getAllWorkoutsByUser(@Request() req:any) {
        return this.workoutService.getWorkoutsByUser(req.user.user_id);
    }

    @Get('last/:routineId')
    async getLastWorkoutByRoutine(@Param('routineId') routineId: string, @Request() req: any) {
        return this.workoutService.getLastWorkoutByRoutine(req.user.user_id, Number(routineId))
    }

    @Get(':id')
    async getWorkoutById(@Param('id') id:string) {
        return this.workoutService.getWorkoutById(Number(id));
    }

    @Post()
    async createWorkout(@Body() data: WorkoutDto, @Request() req:any ) {
        return this.workoutService.createWorkout(data, req.user.user_id);
    }

    @Put(':id')
    async updateWorkout(@Param('id') id: string, @Body() data: WorkoutDto ) {
        return this.workoutService.updateWorkout(Number(id), data);
    }

    @Delete(':id')
    async deleteWorkout(@Param('id') id: string) {
        return this.workoutService.deleteWorkout(Number(id));
    } 
}
