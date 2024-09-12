"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFile(fileUrl: string) {
  try {
    console.log("Attempting to delete file:", fileUrl);

    // Extract the file key from the URL
    const fileKey = fileUrl.split("/").pop();

    if (!fileKey) {
      throw new Error("Invalid file URL");
    }

    console.log("Extracted file key:", fileKey);

    const res = await utapi.deleteFiles([fileKey]);

    console.log("UploadThing delete response:", res);

    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);

    return { success: false, error: String(error) };
  }
}
