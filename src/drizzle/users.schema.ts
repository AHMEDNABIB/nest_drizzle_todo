import { boolean, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 31 }),
  email: varchar('email', {
    length: 255,
  }),
  password: varchar('password', { length: 255 }),
  role: roleEnum('role').default('user'),
  isBanned: boolean('isBanned').default(false),
  address: varchar('address'),
  phone: varchar('phone'),
});
