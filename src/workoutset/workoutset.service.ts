import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { WorkoutSetDto } from '../dtos/workoutset.dto'

@Injectable()
export class WorkoutsetService {
    constructor(private prisma: PrismaService) {}
    
    async getAllWorkoutsSets(){
        return this.prisma.workoutSet.findMany();
    }

    async getWorkoutSetsByWorkout(user: number) {
        const Workout = await this.prisma.workoutSet.findMany({
            where: { workout_id: user },
            take: 1
        });
        if (!Workout) throw new NotFoundException(`WorkoutSet for user ${user} not found`);
        return Workout[0];
    }

    async getWorkoutSetById(id: number) {
        const Workout = await this.prisma.workoutSet.findUnique({
            where: { workout_set_id: id },
        });
        if (!Workout) throw new NotFoundException(`WorkoutSet ${id} not found`);
        return Workout;
    }

    async createWorkoutSet(data: WorkoutSetDto,workoutId:number) {
        return this.prisma.workoutSet.create({
            data: {
                workout_id:workoutId,
                exercise_id: data.exercise_id,
                exercise_order: data.exercise_order,
                set_order: data.set_order,
                reps:data.reps,
                weight:data.weight,
                set_type:data.set_type,
            }
        });
    }

    async updateWorkoutSet(id: number, data: WorkoutSetDto){
        return this.prisma.workoutSet.update({
            where: { workout_set_id: id },
            data
        });
    }

    async deleteWorkoutSet(id: number) {
        return this.prisma.workoutSet.delete({
            where: { workout_set_id: id }
        });
    }
}
