import { TContext } from ".";

export const Post = {
	author: async (parent: any, args:any, {prisma, userInfo}: TContext)=> {
		return await prisma.user.findUnique({
			where: {
				id: parent.authorId
			}
		})
	}
}