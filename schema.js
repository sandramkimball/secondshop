const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        tags: [String]
        description: String
        images: [String]
    },

    type Category {
        id: ID!
        name: String!
        tags: [String]
        count: Int
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
    },

    type Query {
        users: [User]
        user(id: ID!): User
        products: [Product]
        product(id: ID!): Product
        categories: [Category]
        category: Category
        explore: [Explore]
    }

    type Mutation {
        signup(email: String!, password: String!, name: String!): User
        login(email: String!, password: String!): User
    }
    
    type Schema {
        query: Query
        mutation: Mutation
    }
`;


module.exports = {
    typeDefs
}

