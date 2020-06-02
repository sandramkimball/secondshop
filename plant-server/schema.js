const { gql } = require('apollo-server');

// define schema
const typeDefs = gql`
    type Products {
        id: ID!
        name: String!
        description: String
        tags: [String]
        images: [String]
    },

    type Categories {
        id: ID!
        name: String!
        tags: [String]
        count: Integer
        image: String
    },

    type Explore {
        image: String
    },

    type User {
        id: ID!
        name: String!
        location: String
        email: String!
        password: String!
        budget: String
        cap: String
        avatar: String
        notifications: boolean
        newsletter: boolean
    },

    type Query {
        user: [User]
        product(id: ID!): Products
        categories: [Categories]
        category(id: ID!): Category
        explore: [Explore]
        user(id: ID!): User
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Mutation {
        signup(email: String!, password: String!, name: String!, location: String): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }
`;

module.exports = {
    typeDefs
}