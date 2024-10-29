import { Hono } from "hono";
import { ID } from "node-appwrite";

import { zValidator } from "@hono/zod-validator";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE, IMAGES_BUCKET, WORKSPACES } from "@/config";

import { createWorkspaceSchema } from "../schemas";

const app = new Hono().post(
  "/",
  zValidator("form", createWorkspaceSchema),
  sessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    const { name, image } = c.req.valid("form");

    let uploadedImageUrl: string | undefined;

    if (image instanceof File) {
      const file = await storage.createFile(IMAGES_BUCKET, ID.unique(), image);

      const arrayBuffer = await storage.getFilePreview(IMAGES_BUCKET, file.$id);

      uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    }

    console.log(uploadedImageUrl);

    const workspace = await databases.createDocument(
      DATABASE,
      WORKSPACES,
      ID.unique(),
      {
        name,
        userId: user.$id,
        imageUrl: uploadedImageUrl,
      },
    );

    return c.json({ data: workspace });
  },
);

export default app;
