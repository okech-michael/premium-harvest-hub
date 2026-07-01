import serverEntry from "@tanstack/react-start/server-entry";

function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}

function consumeLastCapturedError(): unknown {
  // In serverless context we don't capture global errors; return undefined.
  return undefined;
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const initServerEntry = async (): Promise<ServerEntry> => {
  const mod = await import("@tanstack/react-start/server-entry").then((m) => (m.default ?? m) as any);
  return mod as ServerEntry;
};

const normalizeCatastrophicSsrResponse = async (response: Response): Promise<Response> => {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error("h3 swallowed SSR error"));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};

export default async function handler(request: Request, env: unknown, ctx: unknown) {
  try {
    const entry = await initServerEntry();

    // Ensure the Request.url is an absolute URL; some runtimes provide only a path.
    let reqToUse = request;
    try {
      if (!/^https?:\/\//i.test(String(request.url))) {
        const proto = request.headers?.get?.("x-forwarded-proto") ?? "https";
        const host = request.headers?.get?.("host") ?? "localhost";
        const absolute = new URL(String(request.url), `${proto}://${host}`).toString();
        const init: RequestInit = {
          method: request.method,
          headers: request.headers,
          body: request.body,
        } as any;
        reqToUse = new Request(absolute, init);
      }
    } catch (e) {
      // If normalizing the URL fails, log and continue with original request.
      console.warn("Failed to normalize request URL:", e);
    }

    let response: Response;
    try {
      response = await entry.fetch(reqToUse, env, ctx);
    } catch (err: any) {
      // Protect against runtimes that provide path-only URLs (e.g. "/")
      if (err && (err.code === "ERR_INVALID_URL" || String(err).includes("Invalid URL"))) {
        console.warn("Server entry failed due to invalid URL in request; returning error page.", err);
        return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } });
      }
      throw err;
    }

    return await normalizeCatastrophicSsrResponse(response);
  } catch (error) {
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
}
