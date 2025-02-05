export const typeDefs = `#graphql

	type Query {
		me: User
		profile(id: ID!): Profile
		users: [User]
		posts: [Post]
	}

	type Mutation {
		signup(
		name: String!
		email: String!
		password: String!
		bio: String
		): AuthPayload

		signin(
		email:String!
		password: String!
		): AuthPayload

		addPost(post: PostInput!): PostPayload
		updatePost(postId: ID!, post: PostInput!): PostPayload
		deletePost(postId: ID!): PostPayload
		publishedPost(postId: ID!): PostPayload
	}


  type Post {
	id: ID!
	title: String!
	content: String!
	published: Boolean!
	author: User!
	createdAt: String!
	updatedAt: String!
  }

  type User {
	id: ID!
	name: String!
	email: String!
	posts: [Post]
	createdAt: String!
	updatedAt: String
  }

  type Profile {
	id: ID!
	bio: String!
	user: User!
	createdAt: String!
	updatedAt: String
  }


  

	type AuthPayload {
		token: String
	}

	type PostPayload {
		userError: String
		post: Post
	}

	input PostInput {
		title: String
		content: String
	}

`;
