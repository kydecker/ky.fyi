import { count, desc, not } from "drizzle-orm";
import { getDb } from "../index";
import { guestbookTable } from "../schema";

export async function getGuestbookEntries(offset = 0, pageSize = 24) {
  const db = await getDb();
  return db
    .select()
    .from(guestbookTable)
    .where(not(guestbookTable.isSpam))
    .orderBy(desc(guestbookTable.timestamp))
    .limit(pageSize)
    .offset(offset);
}

export async function getGuestbookCount() {
  const db = await getDb();
  return db
    .select({ count: count() })
    .from(guestbookTable)
    .where(not(guestbookTable.isSpam))
    .get();
}
