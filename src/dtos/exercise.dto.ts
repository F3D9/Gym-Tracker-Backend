import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class ExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  photo_url?: string;
}