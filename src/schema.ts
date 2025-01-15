export const typeDefs = `#graphql

	type Query {
		me: User
		posts: [Post]
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
	bio: String
	user: User
	createdAt: String!
	updatedAt: String
  }

`;
