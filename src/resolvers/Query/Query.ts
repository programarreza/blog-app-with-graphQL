import { TContext } from "../..";

export const Query = {
  // users
  users: async (parent: any, args: any, { prisma }: TContext) => {
    return await prisma.user.findMany();
  },

  // me
  me: async (parent: any, args: any, { prisma, userInfo }: TContext) => {
    return prisma.user.findUnique({
      where: {
        id: userInfo?.userId,
      },
    });
  },

  // profile
  profile: async (parent: any, args: any, { prisma }: TContext) => {
    return prisma.profile.findUnique({
      where: {
        id: args.id,
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
