import { TContext } from "../..";

export const Query = {
  users: async (parent: any, args: any, { prisma }: TContext) => {
    return await prisma.user.findMany();
  },

  profile: async (parent: any, args: any, { prisma }: TContext) => {
    return prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};
