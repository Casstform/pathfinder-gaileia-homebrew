const VISIBILITY_KEY = "gm-only-entry-ids";

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigin = env.ALLOWED_ORIGIN || "https://casstform.github.io";
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : allowedOrigin,
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, PUT, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Vary": "Origin"
  };
}

function json(request, env, payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(request, env), "Content-Type": "application/json; charset=utf-8" }
  });
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

async function isAuthorized(request, env) {
  const authorization = request.headers.get("Authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match || !env.GM_PASSCODE_SHA256) return false;
  return constantTimeEqual(await sha256(match[1]), env.GM_PASSCODE_SHA256);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    const url = new URL(request.url);
    if (url.pathname === "/session" && request.method === "POST") {
      return (await isAuthorized(request, env))
        ? new Response(null, { status: 204, headers: corsHeaders(request, env) })
        : json(request, env, { error: "Unauthorized" }, 401);
    }

    if (url.pathname === "/visibility" && request.method === "GET") {
      const ids = (await env.VISIBILITY.get(VISIBILITY_KEY, "json")) || [];
      return json(request, env, { ids: Array.isArray(ids) ? ids : [] });
    }

    if (url.pathname === "/visibility" && request.method === "PUT") {
      if (!(await isAuthorized(request, env))) {
        return json(request, env, { error: "Unauthorized" }, 401);
      }

      let payload;
      try {
        payload = await request.json();
      } catch (_error) {
        return json(request, env, { error: "Invalid JSON" }, 400);
      }

      if (!payload || !Array.isArray(payload.ids) || payload.ids.length > 500) {
        return json(request, env, { error: "Expected an ids array with at most 500 entries" }, 400);
      }

      const ids = [...new Set(payload.ids)]
        .filter((id) => typeof id === "string" && /^[a-z0-9][a-z0-9-]{0,99}$/.test(id))
        .sort();
      if (ids.length !== new Set(payload.ids).size) {
        return json(request, env, { error: "One or more entry ids are invalid" }, 400);
      }

      await env.VISIBILITY.put(VISIBILITY_KEY, JSON.stringify(ids));
      return json(request, env, { ids });
    }

    return json(request, env, { error: "Not found" }, 404);
  }
};
