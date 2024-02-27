import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'User name is required' })
  @Length(3, 31, {
    message: 'The length of user name must be between 3 and 31 characters',
  })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty({ message: 'User email is required' })
  email: string;

  @IsNotEmpty({ message: 'User password is required' })
  @Length(6)
  password: string;

  role: 'admin' | 'user';
}
