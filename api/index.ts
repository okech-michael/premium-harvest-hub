import serverEntry from "@tanstack/react-start/server-entry";
import { renderErrorPage } from "../src/lib/error-page";
import { consumeLastCapturedError } from "../src/lib/error-capture";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const initServerEntry = async (): Promise<ServerEntry> => {
  const mod = (await serverEntry) as any;
  return (mod?.default ?? mod) as ServerEntry;
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
    const response = await entry.fetch(request, env, ctx);
    return await normalizeCatastrophicSsrResponse(response);
  } catch (error) {
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
}
