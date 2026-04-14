import { and, db, eq, Guestbook as GuestbookDB, gte } from "astro:db";
import type { APIRoute } from "astro";

export const prerender = false;

const AUTHOR_MAX_LENGTH = 28;
const THEME_MIN = 1;
const THEME_MAX = 37;

// Dumb spam filtering. (Is it dumb if it works?)
const SPAM_FILTER_STRINGS = ["<a href", "href="];

const RATE_LIMIT_MS = 24 * 60 * 60 * 1000; // 1 day

export const POST = (async ({ request, clientAddress }) => {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  const rawAuthor = formData.get("author");
  const content = formData.get("content");
  const url = formData.get("url");
  const theme = formData.get("theme");
  const honeypot = formData.get("special");

  if (
    honeypot ||
    typeof rawAuthor !== "string" ||
    typeof content !== "string" ||
    content.length > 140 ||
    typeof url !== "string" ||
    typeof theme !== "string"
  ) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  const author = rawAuthor.trim();
  if (!author || author.length > AUTHOR_MAX_LENGTH) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  const themeNum = Number.parseInt(theme, 10);
  if (Number.isNaN(themeNum) || themeNum < THEME_MIN || themeNum > THEME_MAX) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  if (clientAddress) {
    const cutoff = new Date(Date.now() - RATE_LIMIT_MS);
    const recent = await db
      .select({ id: GuestbookDB.id })
      .from(GuestbookDB)
      .where(
        and(
          eq(GuestbookDB.ip, clientAddress),
          gte(GuestbookDB.timestamp, cutoff),
        ),
      )
      .limit(1);

    if (recent.length > 0) {
      return new Response(
        JSON.stringify({ error: "Only one submission per day" }),
        { status: 429 },
      );
    }
  }

  const isSpam = SPAM_FILTER_STRINGS.some((str) => content.includes(str));

  await db.insert(GuestbookDB).values({
    author,
    content,
    url: url || undefined,
    theme: themeNum,
    isSpam,
    ip: clientAddress || undefined,
  });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}) satisfies APIRoute;

export const ALL = (() => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
  });
}) satisfies APIRoute;
