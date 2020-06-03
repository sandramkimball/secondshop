const { gql } = require('apollo-server-express');

// Define schema
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
        count: Int
        image: String
    },

    type Explore {
        image: String
    },

    type Users {
        id: ID!
        name: String!
        location: String
        email: String!
        password: String!
        budget: String
        cap: String
        avatar: String
        notifications: Boolean
        newsletter: Boolean
    },

    type Query {
        user: [Users]
        users(id: ID!): Users
        products: [Products]
        product(id: ID!): Products
        categories: [Categories]
        explore: [Explore]
    }

    type Mutation {
        signup(email: String!, password: String!, name: String!): Users
        login(email: String!, password: String!): Users
    }
`;

module.exports = {
    typeDefs
}

