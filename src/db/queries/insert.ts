import { getDb } from "../index";
import { guestbookTable, type InsertGuestbookEntry } from "../schema";

export async function insertGuestbookEntry(data: InsertGuestbookEntry) {
  const db = await getDb();
  await db.insert(guestbookTable).values(data);
}
