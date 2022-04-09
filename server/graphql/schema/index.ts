import { buildSchema } from "graphql";

export default buildSchema(`
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

    type RootQuery {
        verifyToken(token: String!): User
    }
    
    type RootMutation {
        login(username: String!, password: String!): LoginUser
        createSellerAccount(userInputs: [UserInput!]!): [User!]!
        changePassword(username: String!, password: String!, newPassword: String!): Username
        resetPassword(username: String!): Username
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
