import type { APIRoute } from "astro";
import {
  AUTHOR_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
  NOTECARD_THEMES,
} from "../../components/Notecard/constants";
import { insertGuestbookEntry } from "../../db/queries/insert";
import { hasRecentEntryFromIp } from "../../db/queries/select";

export const prerender = false;

const SPAM_FILTER_STRINGS = ["<a href", "href="];

const invalid = () =>
  Response.json({ error: "Invalid request" }, { status: 400 });

export const POST = (async ({ request, clientAddress }) => {
  const formData = await request.formData().catch(() => null);
  if (!formData) return invalid();

  const rawAuthor = formData.get("author");
  const content = formData.get("content");
  const url = formData.get("url");
  const theme = formData.get("theme");
  const honeypot = formData.get("special");

  if (
    honeypot ||
    typeof rawAuthor !== "string" ||
    typeof content !== "string" ||
    content.length > CONTENT_MAX_LENGTH ||
    typeof url !== "string" ||
    typeof theme !== "string"
  ) {
    return invalid();
  }

  const author = rawAuthor.trim();
  const themeNum = Number.parseInt(theme, 10);
  if (
    !author ||
    author.length > AUTHOR_MAX_LENGTH ||
    !(themeNum in NOTECARD_THEMES)
  ) {
    return invalid();
  }

  if (clientAddress && (await hasRecentEntryFromIp(clientAddress))) {
    return Response.json(
      { error: "Only one submission per day" },
      { status: 429 },
    );
  }

  await insertGuestbookEntry({
    author,
    content,
    url: url || undefined,
    theme: themeNum,
    isSpam: SPAM_FILTER_STRINGS.some((str) => content.includes(str)),
    ip: clientAddress || undefined,
  });

  return Response.json({ success: true }, { status: 201 });
}) satisfies APIRoute;

export const ALL = (() =>
  Response.json(
    { error: "Method not allowed" },
    { status: 405 },
  )) satisfies APIRoute;
