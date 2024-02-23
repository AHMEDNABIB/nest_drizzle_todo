import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  @IsNotEmpty({ message: 'User email is required' })
  email: string;

  @IsNotEmpty({ message: 'User password is required' })
  @Length(6)
  password: string;
}
