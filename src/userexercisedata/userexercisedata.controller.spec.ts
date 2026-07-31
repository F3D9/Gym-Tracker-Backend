import { Test, TestingModule } from '@nestjs/testing';
import { UserexercisedataController } from './userexercisedata.controller';

describe('UserexercisedataController', () => {
  let controller: UserexercisedataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserexercisedataController],
    }).compile();

    controller = module.get<UserexercisedataController>(UserexercisedataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
