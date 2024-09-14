import prismadb from "../prisma";
import { StreamProps } from "./stream";

export const NUMBEROFSEARCHRESULTS = 15;

export const getSearchResults = async ({
  userId,
  term,
}: {
  userId?: string;
  term: string;
}) => {
  let streams: StreamProps[] = [];

  if (userId) {
    streams = await prismadb.stream.findMany({
      where: {
        user: {
          NOT: {
            blockedUsers: {
              some: {
                blockedUserId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      take: NUMBEROFSEARCHRESULTS,
      select: {
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        { updatedAt: "desc" },
      ],
    });
  } else {
    streams = await prismadb.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      take: NUMBEROFSEARCHRESULTS,
      select: {
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        { updatedAt: "desc" },
      ],
    });
  }

  return streams;
};
