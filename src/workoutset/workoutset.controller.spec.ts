import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsetController } from './workoutset.controller';

describe('WorkoutsetController', () => {
  let controller: WorkoutsetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsetController],
    }).compile();

    controller = module.get<WorkoutsetController>(WorkoutsetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
