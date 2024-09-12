import { cache } from "react";
import prismadb from "../prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = cache(async () => {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.id) {
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      externalUserId: clerkUser.id,
    },
  });

  return user;
});

export const getCurrentUserWithFollowedBy = cache(async () => {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.id) {
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      externalUserId: clerkUser.id,
    },
    include: {
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  return user;
});
