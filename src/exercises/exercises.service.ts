import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExerciseDto } from 'src/dtos/exercise.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class ExercisesService {
    constructor(private prisma: PrismaService) {}
            
        async getAllExercises(){
            return this.prisma.exercise.findMany();
        }
    
        async getExerciseById(id: number) {
            const exercises = await this.prisma.exercise.findUnique({
                where: { exercise_id: id },
            });
            if (!exercises) throw new NotFoundException(`Exercise ${id} not found`);
            return exercises;
        }
    
        async createExercise(data: ExerciseDto) {
            return this.prisma.exercise.create({
                data
            });
        }
    
        async updateExercise(id: number, data: ExerciseDto){
            return this.prisma.exercise.update({
                where: { exercise_id: id },
                data
            });
        }
    
        async deleteExercise(id: number) {
            return this.prisma.exercise.delete({
                where: { exercise_id: id }
            });
        }
}
