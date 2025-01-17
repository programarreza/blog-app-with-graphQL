import { TContext } from "../..";
import { CheckUserAccess } from "../../utils/CheckUserAccess";

export const postResolvers = {
  // Post create
  addPost: async (
    parent: any,
    { post }: any,
    { prisma, userInfo }: TContext
  ) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title and content is required!",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },

  // Post update
  updatePost: async (
    parent: any,
    args: any,
    { prisma, userInfo }: TContext
  ) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await CheckUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },

  // Post delete
  deletePost: async (
    parent: any,
    args: any,
    { prisma, userInfo }: TContext
  ) => {
    if (!userInfo) {
      return {
        userError: "Unauthorized",
        post: null,
      };
    }

    const error = await CheckUserAccess(prisma, userInfo.userId, args.postId);
    if (error) {
      return error;
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: args.postId,
      },
    });

    return {
      userError: null,
      post: deletePost,
    };
  },
};
