import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';
import * as schema from './todos.schema';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,

      useFactory: async () => {
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
