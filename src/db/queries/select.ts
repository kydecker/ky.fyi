import { and, desc, eq, gte, not, sql } from "drizzle-orm";
import { getDb } from "../index";
import { guestbookStatsTable, guestbookTable } from "../schema";

export async function getGuestbookEntries(offset: number, limit: number) {
  const db = await getDb();
  return db
    .select({
      author: guestbookTable.author,
      url: guestbookTable.url,
      content: guestbookTable.content,
      timestamp: guestbookTable.timestamp,
      theme: guestbookTable.theme,
    })
    .from(guestbookTable)
    .where(not(guestbookTable.isSpam))
    .orderBy(desc(guestbookTable.timestamp))
    .limit(limit)
    .offset(offset);
}

export async function getGuestbookCount() {
  const db = await getDb();
  const row = await db
    .select({ count: guestbookStatsTable.visible })
    .from(guestbookStatsTable)
    .where(eq(guestbookStatsTable.id, 1))
    .get();
  return row?.count ?? 0;
}

export async function hasRecentEntryFromIp(ip: string) {
  const db = await getDb();
  const row = await db
    .select({ id: guestbookTable.id })
    .from(guestbookTable)
    .where(
      and(
        eq(guestbookTable.ip, ip),
        gte(guestbookTable.timestamp, sql`datetime('now', '-1 day')`),
      ),
    )
    .get();
  return row !== undefined;
}
