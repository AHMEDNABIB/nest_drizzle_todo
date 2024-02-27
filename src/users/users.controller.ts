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
import { Roles } from './decorator/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update.users.dto';
import { Role } from './enum/role.enum';
import { RolesGuard } from './gurard/roles.guard';
import { UsersGuard } from './gurard/users.guard';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(UsersGuard, RolesGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
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

  @Roles(Role.Admin)
  @UseGuards(UsersGuard, RolesGuard)
  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
  ) {
    console.log(updateUser);
    return this.userService.updateUser(id, updateUser);
  }

  @Roles(Role.Admin)
  @UseGuards(UsersGuard, RolesGuard)
  @Delete(':id')
  softDeleteTodo(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
