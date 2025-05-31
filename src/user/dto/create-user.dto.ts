import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  @IsAlphanumeric('en-US', {
    message: 'Username must contain only letters and numbers.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  email: string;

  @IsInt()
  age: number;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain 8–20 characters, including:
    - one uppercase letter,
    - one lowercase letter,
    - one number,
    - one special character.`,
  })
  password: string;
}
