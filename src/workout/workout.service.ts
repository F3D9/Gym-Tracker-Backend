import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { WorkoutDto } from '../dtos/workout.dto'

@Injectable()
export class WorkoutService {
    constructor(private prisma: PrismaService) {}

    async getAllWorkouts(){
        return this.prisma.workout.findMany();
    }

    async getWorkoutsByUser(user: number) {
        const workouts = await this.prisma.workout.findMany({
            where: { user_id: user },
            orderBy: { started_at: 'desc' },
            include: {
            routine: true,
            sets: {
                include: { exercise: true },
                orderBy: [{ exercise_order: 'asc' }, { set_order: 'asc' }],
            },
            },
        })

        if (!workouts || workouts.length === 0) {
            throw new NotFoundException(`No workouts found for user ${user}`)
        }

        return workouts
    }

    async getWorkoutById(id: number) {
        const Workout = await this.prisma.workout.findUnique({
            where: { workout_id: id },
        });
        if (!Workout) throw new NotFoundException(`Workout ${id} not found`);
        return Workout;
    }

    async createWorkout(data: WorkoutDto, user_id: number) {
        const workout = await this.prisma.workout.create({
            data: {
            user_id: user_id,
            routine_id: data.routine_id,
            duration: data.duration,
            total_volume: data.total_volume,
            exercise_count: data.exercise_count,
            sets: {
                create: data.sets
            }
            },
            include: { sets: true }
        })

        await this.updatePersonalRecords(user_id, workout.sets)

        return workout
    }

    private async updatePersonalRecords(
    userId: number,
    sets: { workout_set_id: number; exercise_id: number; reps: number; weight: number }[]
    ) {
        const byExercise = new Map<number, typeof sets>()

        for (const set of sets) {
            if (!byExercise.has(set.exercise_id)) byExercise.set(set.exercise_id, [])
            byExercise.get(set.exercise_id)!.push(set)
        }

        for (const [exerciseId, exerciseSets] of byExercise) {
            const bestSet = exerciseSets.reduce((max, s) => (s.weight > max.weight ? s : max))
            const volume = exerciseSets.reduce((sum, s) => sum + s.reps * s.weight, 0)

            const existing = await this.prisma.userExerciseData.findUnique({
            where: {
                user_id_exercise_id: { user_id: userId, exercise_id: exerciseId },
            },
            })

            const isNewMaxWeight = !existing || bestSet.weight > (existing.max_weight ?? 0)
            const isNewMaxVolume = !existing || volume > (existing.max_volume ?? 0)

            if (!isNewMaxWeight && !isNewMaxVolume) continue

            await this.prisma.userExerciseData.upsert({
            where: {
                user_id_exercise_id: { user_id: userId, exercise_id: exerciseId },
            },
            create: {
                user_id: userId,
                exercise_id: exerciseId,
                max_weight: bestSet.weight,
                max_volume: volume,
                pr_set_id: isNewMaxWeight ? bestSet.workout_set_id : null,
            },
            update: {
                ...(isNewMaxWeight && {
                max_weight: bestSet.weight,
                pr_set_id: bestSet.workout_set_id,
                }),
                ...(isNewMaxVolume && { max_volume: volume }),
            },
            })
        }
    }

    async updateWorkout(id: number, data: WorkoutDto){
        return this.prisma.workout.update({
            where: { workout_id: id },
            data: {
                routine_id: data.routine_id,
                duration: data.duration,
                total_volume: data.total_volume,
                exercise_count: data.exercise_count,
            }
        });
    }

    async deleteWorkout(id: number) {
        return this.prisma.workout.delete({
            where: { workout_id: id }
        });
    }

    async getLastWorkoutByRoutine(userId: number, routineId: number) {
        const lastWorkout = await this.prisma.workout.findFirst({
            where: {
            user_id: userId,
            routine_id: routineId,
            },
            orderBy: { started_at: 'desc' },
            include: {
            sets: {
                orderBy: [{ exercise_order: 'asc' }, { set_order: 'asc' }],
            },
            },
        })

        return lastWorkout 
    }


}
