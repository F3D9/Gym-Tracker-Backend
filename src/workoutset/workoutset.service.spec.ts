import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsetService } from './workoutset.service';

describe('WorkoutsetService', () => {
  let service: WorkoutsetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsetService],
    }).compile();

    service = module.get<WorkoutsetService>(WorkoutsetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
