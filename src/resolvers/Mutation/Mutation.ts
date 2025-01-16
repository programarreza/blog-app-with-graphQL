import bcrypt from "bcrypt";
import { TContext } from "../..";
import config from "../../config";
import { jwtHelper } from "../../utils/jwtHelper";

interface TUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  // Signup
  signup: async (parent: any, args: TUser, { prisma }: TContext) => {
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

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );
    return {
      token,
    };
  },

  // Signin
  signin: async (parent: any, args: TUser, { prisma }: TContext) => {
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

    const token = await jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secret as string
    );
    return {
      token,
    };
  },

  // Post create
  addPost: async (parent: any, args: any, { prisma, userInfo }: TContext) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!args.title || !args.content) {
      return {
        userError: "Title and content is required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
};
