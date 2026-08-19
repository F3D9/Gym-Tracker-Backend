import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [WorkoutController],
  providers: [WorkoutService],
  exports:[WorkoutService]
})
export class WorkoutModule {}
