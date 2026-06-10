import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestbookTable = sqliteTable("guestbook", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  author: text().notNull(),
  url: text(),
  timestamp: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  theme: integer("theme").notNull(),
  isSpam: integer("isSpam", { mode: "boolean" }),
  ip: text(),
});

export type InsertGuestbookEntry = typeof guestbookTable.$inferInsert;
export type SelectGuestbookEntry = typeof guestbookTable.$inferSelect;
