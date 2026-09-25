import { drizzle } from "drizzle-orm/d1";

// Imported lazily so prerendered pages (built in Node) can load this module.
export async function getDb() {
  const { env } = await import("cloudflare:workers");
  return drizzle(env.GUESTBOOK_DB);
}
