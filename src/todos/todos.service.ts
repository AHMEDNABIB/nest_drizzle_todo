import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { CreateTodoDto } from './dto/create-todos.dto';
import { UpdateTodoDto } from './dto/update-todos.dto';
import * as schema from './schema/todos.schema';
@Injectable()
export class TodosService {
  constructor(
    @Inject('DB_DEV') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async getAllTodos() {
    return await this.db.select().from(schema.todos);
  }

  async createTodos(createTodoDto: CreateTodoDto) {
    return await this.db.insert(schema.todos).values(createTodoDto);
  }

  async getTodos(id: number) {
    return await this.db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, id));
  }

  async updateTodos(id: any, updateTodoDto: UpdateTodoDto) {
    return await this.db
      .update(schema.todos)
      .set(updateTodoDto)
      .where(eq(schema.todos.id, id))
      .returning({ updatedId: schema.todos.id });
  }

  async deleteTodos(id: number) {
    return await this.db
      .delete(schema.todos)
      .where(eq(schema.todos.id, id))
      .returning({ deletedId: schema.todos.id });
  }
}
