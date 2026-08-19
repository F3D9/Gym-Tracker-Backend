import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Matches, ValidateIf } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @ValidateIf((o) => !o.isGuest)
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email?: string | null | undefined;

  @ValidateIf((o) => !o.isGuest)
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/,
    { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
  password?: string | null | undefined;

  @IsOptional()
  isGuest?: boolean;
}