import type { APIRoute } from "astro";

export const prerender = false;

export const POST = (async ({ request }) => {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  const email = formData.get("email");
  if (typeof email !== "string" || !email) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
    });
  }

  const response = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${import.meta.env.BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (response.status === 201) {
    return new Response(null, { status: 200 });
  }

  let errorMessage: string | undefined;
  try {
    const body = await response.json<Record<string, unknown>>();
    // Buttondown returns DRF-style errors: { fieldName: ["msg", ...] } or { detail: "msg" }
    if (typeof body?.detail === "string") {
      errorMessage = body.detail;
    } else if (body && typeof body === "object") {
      for (const value of Object.values(body)) {
        const msg = Array.isArray(value) ? value[0] : value;
        if (typeof msg === "string") {
          errorMessage = msg;
          break;
        }
      }
    }
  } catch {
    // non-JSON error body — fall through to generic message
  }

  return new Response(
    JSON.stringify({ error: errorMessage ?? "Something went wrong" }),
    {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    },
  );
}) satisfies APIRoute;

export const ALL = (() => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
  });
}) satisfies APIRoute;
