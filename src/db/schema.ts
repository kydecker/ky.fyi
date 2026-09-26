import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const guestbookTable = sqliteTable(
  "guestbook",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    content: text().notNull(),
    author: text().notNull(),
    url: text(),
    timestamp: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    theme: integer().notNull(),
    isSpam: integer({ mode: "boolean" }),
    ip: text(),
  },
  (table) => [
    index("guestbook_visible_timestamp")
      .on(table.timestamp)
      .where(sql`NOT "isSpam"`),
    index("guestbook_ip_timestamp").on(table.ip, table.timestamp),
  ],
);

// Single row (id 1) kept in sync by triggers in migrations/0001.
export const guestbookStatsTable = sqliteTable("guestbook_stats", {
  id: integer().primaryKey(),
  visible: integer().notNull(),
});

export type InsertGuestbookEntry = typeof guestbookTable.$inferInsert;
