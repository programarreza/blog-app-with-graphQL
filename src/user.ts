import { TContext } from ".";

export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: TContext) => {
    if (parent.id === userInfo?.userId) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
      });
    }
  },
};
