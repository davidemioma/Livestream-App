"use server";

import prismadb from "../prisma";
import { getUserById } from "../data/user";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../data/auth";

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
      throw new Error("User not found");
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
      // Todo: Kick user from stream and chat.
      // Todo: Allow ability to kick out guest users.

      if (isBlocked) {
        throw new Error("You are already blocking this user");
      }

      await prismadb.block.create({
        data: {
          blockerId: currentUser.id,
          blockedUserId: otherUser.id,
        },
      });

      revalidatePath("/");

      revalidatePath(`/${otherUser.username}`);

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

      revalidatePath("/");

      revalidatePath(`/${otherUser.username}`);

      return { success: true };
    }
  } catch (err) {
    console.log("BLOCK_OR_UNBLOCK_USER_ERROR", err);

    throw new Error("Something went wrong! Failed to block or unblock user");
  }
};
