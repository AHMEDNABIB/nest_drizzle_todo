import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('DB_DEV') private drizzleDev: PostgresJsDatabase<typeof schema>,
  // ) {}
  // async getData() {
  //   const todos = await this.drizzleDev.query.todos.findMany();
  //   return {
  //     todos: todos,
  //   };
  // }
}
