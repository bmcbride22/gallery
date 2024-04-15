// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { url } from "inspector";

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
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    userId: varchar("user", { length: 256 })
      .notNull()
      .references(() => users.clerkId),
  },
  (example) => ({
    nameIndex: index("image_name_idx").on(example.name),
  }),
  // Add a foreign key to the user table
);
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
