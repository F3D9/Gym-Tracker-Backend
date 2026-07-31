import { Test, TestingModule } from '@nestjs/testing';
import { UserexercisedataService } from './userexercisedata.service';

describe('UserexercisedataService', () => {
  let service: UserexercisedataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserexercisedataService],
    }).compile();

    service = module.get<UserexercisedataService>(UserexercisedataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
