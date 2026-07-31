import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RoutinesModule } from './routines/routines.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SetsModule } from './sets/sets.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserexercisedataModule } from './userexercisedata/userexercisedata.module';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutsetModule } from './workoutset/workoutset.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    RoutinesModule,
    ExercisesModule,
    SetsModule,
    PrismaModule,
    AuthModule,
    UserexercisedataModule,
    WorkoutModule,
    WorkoutsetModule,
        ],
})
export class AppModule {}
