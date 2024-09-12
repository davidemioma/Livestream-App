"use server";

import prismadb from "../prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../data/auth";

export const updateUserInfo = async (values: Partial<User>) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const validValues = {
      bio: values.bio,
    };

    await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...validValues,
      },
    });

    revalidatePath(`/${currentUser.username}`);

    revalidatePath(`/u/${currentUser.username}`);

    return { success: true };
  } catch (err) {
    console.log("Update User", err);

    throw new Error("Unable to update user info");
  }
};
