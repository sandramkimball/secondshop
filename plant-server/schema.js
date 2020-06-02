const { gql } = require('apollo-server');

// define schema
export default typeDefs = gql`
    type Products {
        id: ID,
        name: String,
        description: String,
        tags: [String],
        images: [String],
    },

    type Categories {
        id: ID,
        name: String,
        tags: [String],
        count: Integer,
        image: String,
    },

    type Explore {
        image: String
    },

    type Profile {
        id: ID,
        name: String,
        location: String,
        email: String,
        budget: String,
        cap: String,
        avatar: String,
        notifications: boolean,
        newsletter: boolean
    },

    type Query {
        products: [Products],
        product(id: ID!): Products
        categories: [Categories],
        category(id: ID!): Category
        explore: [Explore],
        profile(id: ID!): Profile
    }

    type Mutation {
        addUser(
            name: String,
            location: String,
            email: String,
            budget: String,
            cap: String,
            avatar: String,
            notifications: boolean,
            newsletter: boolean
        ): Profile
    }
`;

// query GetProducts {
//     products {
//         name,
//         description,
//         tags,
//         images
//     }
// };

// mutation CreateUser {
//     addUser (
//         name: 'Cici',
//         location: 'Thailand',
//     )
// }