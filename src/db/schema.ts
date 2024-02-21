import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
  'inprogress',
  'done',
  'important',
  'trash',
]);

export const priorityEnum = pgEnum('priority', ['Low', 'Medium', 'High']);

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 256 }),
  status: statusEnum('status').default('inprogress'),
  tags: varchar('tags', { length: 256 }),
  priority: priorityEnum('priority'),
  isdone: boolean('isdone').default(false),
  isdeleted: boolean('isdeleted').default(false),
  isimportant: boolean('isimportant').default(false),
  expired_at: date('expired_at').default(null),
});
