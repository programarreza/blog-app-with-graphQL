import { authResolvers } from "./auth";
import { postResolvers } from "./post";

export const Mutation = {
  // auth
  ...authResolvers,

  // post
  ...postResolvers,
};
