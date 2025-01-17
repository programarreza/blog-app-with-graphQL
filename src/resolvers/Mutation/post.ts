import { TContext } from "../..";

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

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });

    if (!user) {
      return {
        userError: "User not found",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: args.postId,
      },
    });

    if (!post) {
      return {
        userError: "Post not found",
        post: null,
      };
    }

    if (user.id !== post.authorId) {
      return {
        userError: "Post not owned by user!",
        post: null,
      };
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: args.post,
    });

    return {
      userError: null,
      post: updatedPost,
    };
  },
};
