import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UserExerciseDataDto {
  @IsInt()
  user_id: number;

  @IsInt()
  exercise_id: number;

  @IsOptional()
  @IsNumber()
  max_weight?: number;

  @IsOptional()
  @IsNumber()
  max_volume?: number;

  @IsOptional()
  @IsInt()
  pr_set_id?: number;
}