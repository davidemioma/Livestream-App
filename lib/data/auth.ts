import { cache } from "react";
import prismadb from "../prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = cache(async () => {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.id) {
    throw new Error("Unauthorized");
  }

  const user = await prismadb.user.findUnique({
    where: {
      externalUserId: clerkUser.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
});
