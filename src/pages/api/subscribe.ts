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
    const body = await response.json();
    if (typeof body?.error === "string") errorMessage = body.error;
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
