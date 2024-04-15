// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gallery_${name}`);

export const images = createTable(
  "images",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("user", { length: 256 })
      .notNull()
      .references(() => users.clerkId),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("image_name_idx").on(example.name),
  }),
);

export const imagesRelations = relations(images, ({ one }) => ({
  owner: one(users, {
    fields: [images.userId],
    references: [users.clerkId],
    relationName: "owner",
  }),
}));
export const users = createTable(
  "users",
  {
    id: serial("id").notNull(),
    clerkId: varchar("clerk_id", { length: 256 }).primaryKey().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("url", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    nameIndex: index("user_name_idx").on(example.name),
    clerkIndex: index("user_clerk_idx").on(example.clerkId),
  }),
);
export const usersRelations = relations(users, ({ many }) => ({
  images: many(images),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
