import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../config";
import { jwtHelper } from "../utils/jwtHelper";

const prisma = new PrismaClient();

interface TUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },

  Mutation: {
    signup: async (parent: any, args: TUser, context: any) => {
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (isExist) {
        throw new Error("User already exist");
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: { name: args.name, email: args.email, password: hashedPassword },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser.id,
          },
        });
      }

      const token = await jwtHelper(
        { userId: newUser.id },
        config.jwt.secret as string
      );
      return {
        token,
      };
    },

    signin: async (parent: any, args: TUser, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const correctPass = await bcrypt.compare(args.password, user.password);

      if (!correctPass) {
        throw new Error("Incorrect password");
      }

      const token = await jwtHelper(
        { userId: user.id },
        config.jwt.secret as string
      );
      return {
        token,
      };
    },
  },
};
