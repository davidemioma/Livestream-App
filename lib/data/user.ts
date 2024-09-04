import prismadb from "../prisma";
import { getCurrentUser } from "./auth";

export const getUserById = async (id: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const getUserByExternalUserId = async (id: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      externalUserId: id,
    },
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
    },
  });

  return user;
};

export const isFollowingUser = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    const otherUser = await getUserById(id);

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (currentUser.id === otherUser.id) {
      return true;
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

    return !!isFollowing;
  } catch (err) {
    return false;
  }
};

export const getFollowedUsers = async (take?: number) => {
  try {
    const currentUser = await getCurrentUser();

    const followedUsers = await prismadb.follow.findMany({
      where: {
        followerId: currentUser.id,
        following: {
          blockedUsers: {
            none: {
              blockerId: currentUser.id,
            },
          },
        },
      },
      take: take || undefined,
      select: {
        id: true,
        following: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return followedUsers;
  } catch (err) {
    return [];
  }
};

export const isUserBlocked = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    const otherUser = await getUserById(id);

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (currentUser.id === otherUser.id) {
      return false;
    }

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

    return !!isBlocked;
  } catch (err) {
    return false;
  }
};

export const isBlockedByUser = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();

    const otherUser = await getUserById(id);

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (currentUser.id === otherUser.id) {
      return false;
    }

    const isBlocked = await prismadb.block.findUnique({
      where: {
        blockerId_blockedUserId: {
          blockerId: otherUser.id,
          blockedUserId: currentUser.id,
        },
      },
      select: {
        id: true,
      },
    });

    return !!isBlocked;
  } catch (err) {
    return false;
  }
};
