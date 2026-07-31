import { IsInt, IsNumber, IsEnum, IsBoolean, IsOptional, Min } from 'class-validator'
import { SetType } from '../generated/prisma/client.js'

export class WorkoutSetDto {
  @IsInt()
  exercise_id: number

  @IsInt()
  @Min(1)
  exercise_order: number

  @IsInt()
  @Min(1)
  set_order: number

  @IsInt()
  @Min(0)
  reps: number

  @IsNumber()
  @Min(0)
  weight: number

  @IsOptional()
  @IsEnum(SetType)
  set_type?: SetType

}