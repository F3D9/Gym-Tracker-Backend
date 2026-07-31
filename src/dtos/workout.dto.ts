import { IsInt, IsOptional, IsDateString, ValidateNested, IsArray, ArrayMinSize, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { WorkoutSetDto } from './workoutset.dto'

export class WorkoutDto {
  @IsOptional()
  @IsInt()
  routine_id?: number

  @IsInt()
  duration: number

  @IsInt()
  total_volume: number

  @IsInt()
  exercise_count: number

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => WorkoutSetDto)
  sets: WorkoutSetDto[]
}