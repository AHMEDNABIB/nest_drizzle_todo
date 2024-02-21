import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as schema from './todos/schema/todos.schema';

import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DB_DEV',
      postgres: {
        url: 'postgres://postgres:rabbi@127.0.0.1:5432/todos',
      },
      config: { schema: { ...schema } },
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
