import prismadb from "../prisma";
import { User } from "@prisma/client";
import { getCurrentUser } from "./auth";
import { getFollowedUsers } from "./user";

export const getRecommended = async () => {
  let currentUser;

  try {
    currentUser = await getCurrentUser();
  } catch (err) {
    currentUser = null;
  }

  let users: User[] = [];

  if (currentUser) {
    const followedUsers = await getFollowedUsers();

    const followedUsersIds = followedUsers.map((user) => user.following.id);

    users = await prismadb.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: currentUser.id,
            },
          },
          {
            NOT: {
              id: {
                in: followedUsersIds,
              },
            },
          },
          {
            NOT: {
              blockedUsers: {
                some: {
                  blockerId: currentUser.id,
                },
              },
            },
          },
          {
            NOT: {
              blockers: {
                some: {
                  blockedUserId: currentUser.id,
                },
              },
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await prismadb.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
