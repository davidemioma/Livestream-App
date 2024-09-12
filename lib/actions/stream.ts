"use server";

import prismadb from "../prisma";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../data/auth";
import { getStreamByUserId } from "../data/stream";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const stream = await getStreamByUserId(currentUser.id);

    if (!stream) {
      throw new Error("Stream not found");
    }

    const validValues = {
      name: values.name,
      thumbnailUrl: values.thumbnailUrl,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    await prismadb.stream.update({
      where: {
        id: stream.id,
        userId: currentUser.id,
      },
      data: {
        ...validValues,
      },
    });

    revalidatePath(`/${currentUser.username}`);

    revalidatePath(`/u/${currentUser.username}`);

    revalidatePath(`/u/${currentUser.username}/chat`);

    return { success: true };
  } catch (err) {
    console.log("UPDATE STREAM ERROR", err);

    throw new Error("Failed to update stream");
  }
};
