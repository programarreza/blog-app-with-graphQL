import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "..";

const batchUsers = async (ids: string[]): Promise<User[]> => {
  // ids: [10, 12, 23, 34, 56]
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  //   convert object to array
  const userData: { [key: string]: User } = {};

  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids.map((id) => userData[id]);
};

// @ts-ignore
export const userLoader = new DataLoader<string, User>(batchUsers);
