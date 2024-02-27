import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../constants';
import * as schema from '../drizzle/schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update.users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>,
    private jwtService: JwtService,
  ) {}

  async loginUser(
    loginDto: LoginDto,
  ): Promise<{ email: string; token: string }> {
    const { email, password } = loginDto;
    try {
      //   const user = await this.userModel.findOne({ email });
      const user: any = await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email));

      // console.log(user[0].id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = { userId: user[0].id, role: user[0].role };

      // console.log(this.jwtService);

      const token = this.jwtService.sign(payload);
      // console.log(payload);
      const loginUser = { email, token };
      // console.log(token);
      return loginUser;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }

  async registerUser(
    registerDto: RegisterDto,
  ): Promise<{ message: string; user: { name: string; email: string } }> {
    const { name, email, password } = registerDto;
    try {
      const hash = await bcrypt.hash(password, 10);
      await this.db
        .insert(schema.users)
        .values({ name, email, password: hash });
      const sanitizedUser = { name, email };

      return { message: 'User registered successfully', user: sanitizedUser };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsers() {
    try {
      return await this.db.select().from(schema.users);
    } catch (error) {
      throw new Error('An error occurred while retrieving users');
    }
  }

  async deleteUser(id: number) {
    return await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning({ deletedId: schema.users.id });
  }

  async updateUser(id: any, updateUser: UpdateUserDto) {
    if (updateUser.password) {
      const hash = await bcrypt.hash(updateUser.password, 10);
      updateUser.password = hash;
    }
    return await this.db
      .update(schema.users)
      .set(updateUser)
      .where(eq(schema.users.id, id))
      .returning({ updatedId: schema.users.id });
  }
}
