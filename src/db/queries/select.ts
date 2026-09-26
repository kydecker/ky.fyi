import { desc, eq, not } from "drizzle-orm";
import { getDb } from "../index";
import { guestbookStatsTable, guestbookTable } from "../schema";

export async function getGuestbookEntries(offset = 0, pageSize = 24) {
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
    .limit(pageSize)
    .offset(offset);
}

export async function getGuestbookCount() {
  const db = await getDb();
  return db
    .select({ count: guestbookStatsTable.visible })
    .from(guestbookStatsTable)
    .where(eq(guestbookStatsTable.id, 1))
    .get();
}
