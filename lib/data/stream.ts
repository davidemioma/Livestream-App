import prismadb from "../prisma";

export const getStreamByUserId = async (userId: string) => {
  const stream = await prismadb.stream.findUnique({
    where: {
      userId,
    },
  });

  return stream;
};
