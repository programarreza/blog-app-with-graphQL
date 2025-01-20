import { TContext } from "../..";

export const Query = {
  // users
  users: async (__: any, { prisma }: TContext) => {
    return await prisma.user.findMany();
  },

  // me
  me: async (__: any, { prisma, userInfo }: TContext) => {
    return prisma.user.findUnique({
      where: {
        id: userInfo?.userId,
      },
    });
  },

  // profile
  profile: async (_: any, args: any, { prisma }: TContext) => {
    return prisma.profile.findUnique({
      where: {
        id: args.id,
      },
    });
  },

  // all posts
  posts: async (__: any, { prisma }: TContext) => {
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
