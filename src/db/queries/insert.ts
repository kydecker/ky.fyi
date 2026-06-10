import { db } from "../index";
import { guestbookTable, type InsertGuestbookEntry } from "../schema";

export async function insertGuestbookEntry(data: InsertGuestbookEntry) {
  await db.insert(guestbookTable).values(data);
}
