import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoutineDto } from 'src/dtos/routine.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RoutinesService {

    constructor(private prisma: PrismaService) {}
    
    async getAllRoutines(id: number) {
        return this.prisma.routine.findMany({
            where: { user_id:id}
        });
    }

    async getRoutineById(id: number) {
        const routine = await this.prisma.routine.findUnique({
            where: { routine_id: id },
            include: {
            sets: {
                include: { exercise: true },
                orderBy: [{ exercise_order: 'asc' }, { set_order: 'asc' }],
            },
            },
        })

        if (!routine) return null

        // Agrupar sets planos en ejercicios
        const exerciseMap = new Map<number, {
            exercise_id: number
            name: string
            photo_url: string | null
            sets: { order: number; reps: number; weight: number; set_type: string }[]
        }>()

        for (const set of routine.sets) {
            if (!exerciseMap.has(set.exercise_id)) {
            exerciseMap.set(set.exercise_id, {
                exercise_id: set.exercise_id,
                name: set.exercise.name,
                photo_url: set.exercise.photo_url,
                sets: [],
            })
            }
            exerciseMap.get(set.exercise_id)!.sets.push({
            order: set.set_order,
            reps: set.reps,
            weight: set.weight,
            set_type: set.set_type,
            })
        }

        return {
            routine_id: routine.routine_id,
            name: routine.name,
            exercise_count: routine.exercise_count,
            exercises: Array.from(exerciseMap.values()),
        }
    }

    async createRoutine(user_id:number,data: RoutineDto){
        return this.prisma.routine.create({
            data:{
                name: data.name,
                user_id: user_id,
                sets: {
                    create:data.sets,
                },
                exercise_count: data.exercise_count,
            },
            include: { sets: true }
        });
    }

    async updateRoutine(id: number, data: RoutineDto){
        await this.prisma.$transaction([
            this.prisma.set.deleteMany({ where: { routine_id: id } }),
            this.prisma.routine.update({
                where: { routine_id: id },
                data: { name: data.name },
            }),
        ]);

        await this.prisma.set.createMany({
            data: data.sets.map(set => ({
                ...set,
                routine_id: id,
            })),
        });

        return this.getRoutineById(id);
    }

    async deleteRoutine(id: number){
        return this.prisma.routine.delete({
            where: { routine_id: id }
        });
    }
}
