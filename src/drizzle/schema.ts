import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
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

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 31 }),
  email: varchar('email', { length: 255 }),
  password: varchar('password', { length: 255 }),
  role: roleEnum('role').default('user'),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

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
  userId: integer('user_id'),
  expired_at: date('expired_at').default(null),
});

export const todosRelations = relations(todos, ({ one }) => ({
  todo: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));
