import prismadb from "../prisma";
import { getCurrentUser } from "./auth";

export const getRecommended = async () => {
  const currentUser = await getCurrentUser();

  const users = await prismadb.user.findMany({
    where: {
      id: {
        not: currentUser.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
