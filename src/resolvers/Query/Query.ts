import { TContext } from "../..";

export const Query = {
  users: async (parent: any, args: any, { prisma }: TContext) => {
    return await prisma.user.findMany();
  },

  profile: async (parent: any, args: any, { prisma, userInfo }: TContext) => {
    return prisma.user.findUnique({
      where: {
        id: userInfo?.userId,
      },
    });
  },

  // all posts
  posts: async (parent: any, args: any, { prisma }: TContext) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
