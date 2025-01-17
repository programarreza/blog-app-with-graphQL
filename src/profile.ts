import { TContext } from ".";

export const Profile = {
  user: async (parent: any, args: any, { prisma }: TContext) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },
};
