import { Module } from '@nestjs/common';
import { UserexercisedataController } from './userexercisedata.controller';
import { UserexercisedataService } from './userexercisedata.service';

@Module({
  controllers: [UserexercisedataController],
  providers: [UserexercisedataService]
})
export class UserexercisedataModule {}
