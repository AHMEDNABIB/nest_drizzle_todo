import { Module } from '@nestjs/common';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
