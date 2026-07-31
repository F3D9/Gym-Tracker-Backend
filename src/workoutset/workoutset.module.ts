import { Module } from '@nestjs/common';
import { WorkoutsetController } from './workoutset.controller';
import { WorkoutsetService } from './workoutset.service';

@Module({
  controllers: [WorkoutsetController],
  providers: [WorkoutsetService]
})
export class WorkoutsetModule {}
