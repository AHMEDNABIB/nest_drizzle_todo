import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { UsersGuard } from './users.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(UsersGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('register')
  async registerUser(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    return await this.userService.registerUser(registerDto);
  }

  @Post('login')
  async loginUser(@Body() loginDto: LoginDto): Promise<{
    message: string;
    loginUser: {
      email: string;
      token: string;
    };
  }> {
    const loginUser = await this.userService.loginUser(loginDto);
    return { message: 'Login successful', loginUser };
  }
}
