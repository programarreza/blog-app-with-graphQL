import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { jwtHelper } from "./utils/jwtHelper";

const prisma = new PrismaClient();

export interface TContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: {
    userId: string;
  } | null;
}

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<TContext> => {
      const userInfo = await jwtHelper.getUserInfoFromToken(
        req.headers.authorization as string
      );

      return {
        prisma,
        userInfo,
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
}
main();
