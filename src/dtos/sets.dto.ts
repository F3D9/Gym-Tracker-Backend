import { IsInt, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { SetType } from '../generated/prisma/client.js';

export class SetsDto {
  @IsInt()
  exercise_id: number;

  @IsInt()
  exercise_order: number;

  @IsInt()
  set_order: number;

  @IsInt()
  reps: number;

  @IsNumber()
  weight: number;

  @IsOptional()
  @IsEnum(SetType)
  set_type?: SetType; 
}