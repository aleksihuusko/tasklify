import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";

import { zValidator } from "@hono/zod-validator";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get(
  "/hello",
  zValidator(
    "query",
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello ${name} from Tasklify!`,
    });
  },
);

app.get("/projects/:projectId", (c) => {
  const { projectId } = c.req.param();
  return c.json({
    project: `Project ID: ${projectId}`,
  });
});

export const GET = handle(app);
export const POST = handle(app);
