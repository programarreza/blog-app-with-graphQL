export const CheckUserAccess = async (prisma: any, userId: string, postId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
      id: postId,
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
};
