// biome-ignore-all lint/style/noNonNullAssertion: env vars are defined.

import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: import.meta.env.TURSO_CONNECTION_URL!,
    authToken: import.meta.env.TURSO_AUTH_TOKEN!,
  },
});
