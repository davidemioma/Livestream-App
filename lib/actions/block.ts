"use server";

import prismadb from "../prisma";
import { getUserById } from "../data/user";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../data/auth";
import { roomService } from "../livekit";

export const blockOrUnblockUser = async ({
  id,
  task,
}: {
  id: string;
  task: "block" | "unblock";
}) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    if (currentUser.id === id) {
      throw new Error("You cannot block yourself");
    }

    const otherUser = await getUserById(id);

    if (!otherUser) {
      if (task === "block") {
        await roomService.removeParticipant(currentUser.id, id);
      }

      return { messge: "This is a guest user" };
    }

    // Check if the user is already blocked
    const isBlocked = await prismadb.block.findUnique({
      where: {
        blockerId_blockedUserId: {
          blockerId: currentUser.id,
          blockedUserId: otherUser.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (task === "block") {
      if (isBlocked) {
        throw new Error("You are already blocking this user");
      }

      await prismadb.block.create({
        data: {
          blockerId: currentUser.id,
          blockedUserId: otherUser.id,
        },
      });

      revalidatePath(`/${currentUser.username}`);

      revalidatePath(`/u/${currentUser.username}`);

      revalidatePath(`/u/${currentUser.username}/community`);

      return { success: true };
    } else {
      if (!isBlocked) {
        throw new Error("You are not blocking this user");
      }

      await prismadb.block.delete({
        where: {
          id: isBlocked.id,
          blockerId_blockedUserId: {
            blockerId: currentUser.id,
            blockedUserId: otherUser.id,
          },
        },
      });

      revalidatePath(`/${currentUser.username}`);

      revalidatePath(`/u/${currentUser.username}`);

      revalidatePath(`/u/${currentUser.username}/community`);

      return { success: true };
    }
  } catch (err) {
    console.log("BLOCK_OR_UNBLOCK_USER_ERROR", err);

    throw new Error("Something went wrong! Failed to block or unblock user");
  }
};
