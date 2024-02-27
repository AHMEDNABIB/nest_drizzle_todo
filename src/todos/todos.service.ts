import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../constants';
import * as schema from '../drizzle/schema';
import { UsersService } from '../users/users.service';
import { CreateTodoDto } from './dto/create-todos.dto';
import { UpdateTodoDto } from './dto/update-todos.dto';
@Injectable()
export class TodosService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async getAllTodos(id: number) {
    // console.log(schema.todo);
    // console.log(id);
    return await this.db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.userId, id));
  }

  async createTodos(createTodoDto: CreateTodoDto, id: number) {
    // console.log(req.user);
    createTodoDto.userId = id;
    // console.log(createTodoDto);
    return await this.db.insert(schema.todos).values(createTodoDto);
  }

  async getTodos(id: number, userId) {
    return await this.db
      .select()
      .from(schema.todos)
      .where(and(eq(schema.todos.id, id), eq(schema.todos.userId, userId)));
  }

  async updateTodos(id: any, updateTodoDto: UpdateTodoDto, userId) {
    updateTodoDto.userId = userId;
    return await this.db
      .update(schema.todos)
      .set(updateTodoDto)
      .where(and(eq(schema.todos.id, id), eq(schema.todos.userId, userId)))
      .returning({ updatedId: schema.todos.id });
  }

  async deleteTodos(id: number, userId) {
    return await this.db
      .delete(schema.todos)
      .where(and(eq(schema.todos.id, id), eq(schema.todos.userId, userId)))
      .returning({ deletedId: schema.todos.id });
  }
}
