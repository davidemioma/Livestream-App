import { z } from "zod";
import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import { StreamProps } from "@/lib/data/stream";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const { limit, page, userId, term } = z
      .object({
        limit: z.string(),
        page: z.string(),
        userId: z.string().optional(),
        term: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        userId: url.searchParams.get("userId"),
        term: url.searchParams.get("term"),
      });

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
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
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
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
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

    return NextResponse.json(streams);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
