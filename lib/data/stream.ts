import prismadb from "../prisma";
import { Stream, User } from "@prisma/client";

export const getStreamByUserId = async (userId: string) => {
  const stream = await prismadb.stream.findUnique({
    where: {
      userId,
    },
  });

  return stream;
};

export type StreamProps = Pick<
  Stream,
  "id" | "name" | "isLive" | "thumbnailUrl"
> & {
  user: Pick<User, "id" | "username" | "imageUrl">;
};

export const NUMBEROFSTREAMS = 15;

export const getStreams = async ({ userId }: { userId?: string }) => {
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
      },
      take: NUMBEROFSTREAMS,
      select: {
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
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
      take: NUMBEROFSTREAMS,
      select: {
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
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
