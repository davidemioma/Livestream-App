"use server";

import prismadb from "../prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../data/auth";
import { getUserById, isFollowingUser } from "../data/user";

export const followUser = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const otherUser = await getUserById(id);

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (currentUser.id === otherUser.id) {
      throw new Error("You cannot follow yourself");
    }

    const isFollowing = await isFollowingUser(otherUser.id);

    if (isFollowing) {
      throw new Error("You are already following this user");
    }

    await prismadb.follow.create({
      data: {
        followerId: currentUser.id,
        followingId: otherUser.id,
      },
    });

    revalidatePath("/");

    revalidatePath(`/${otherUser.username}`);

    return { success: true };
  } catch (error) {
    console.log("FOLLOW_USER_ERROR", error);

    throw new Error("Failed to follow user");
  }
};

export const unFollowUser = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    const otherUser = await getUserById(id);

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (currentUser.id === otherUser.id) {
      throw new Error("You cannot unfollow yourself");
    }

    const isFollowing = await prismadb.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: otherUser.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!isFollowing) {
      throw new Error("You don't follow this user");
    }

    await prismadb.follow.delete({
      where: {
        id: isFollowing.id,
      },
    });

    revalidatePath("/");

    revalidatePath(`/${otherUser.username}`);

    return { success: true };
  } catch (error) {
    console.log("UNFOLLOW_USER_ERROR", error);

    throw new Error("Failed to unfollow user");
  }
};
