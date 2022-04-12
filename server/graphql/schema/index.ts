import { gql } from "apollo-server";

const typeDefs = gql`
    type User {
        username: String!
        password: String!
        error: String
    }

    type LoginUser {
        username: String!
        token: String
    }

    input UserInput {
        username: String!
        password: String!
    }

    type Username {
        username: String!
    }

    type Query {
        hello: String
        hii: String
        verifyToken(token: String!): User
    }

    type Mutation {
        login(username: String!, password: String!): LoginUser
        createSellerAccount(userInputs: [UserInput!]!): [User!]!
        changePassword(
            username: String!
            password: String!
            newPassword: String!
        ): Username
        resetPassword(username: String!): Username
    }
`;

export default typeDefs;
