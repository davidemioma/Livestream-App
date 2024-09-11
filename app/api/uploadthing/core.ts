import prismadb from "@/lib/prisma";
import { getCurrentUser } from "@/lib/data/auth";

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Unauthorized");

  return { user };
};

export const ourFileRouter = {
  thumbnailFileUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
