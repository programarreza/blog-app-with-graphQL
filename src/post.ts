import { TContext } from ".";
import { userLoader } from "./dataLoaders/userLoader";

export const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: TContext) => {
    return userLoader.load(parent.authorId);
  },
};
