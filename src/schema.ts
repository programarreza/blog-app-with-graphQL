export const typeDefs = `#graphql

	type Query {
		me: User
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
	}

	type AuthPayload {
		token: String
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

`;
