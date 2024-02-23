import { Module } from '@nestjs/common';

import { DrizzleModule } from '../drizzle/drizzle.module';
import { UsersModule } from '../users/users.module';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [DrizzleModule, UsersModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
