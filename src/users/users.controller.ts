import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update.users.dto';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';

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
