import { buildSchema } from "graphql";

export default buildSchema(`
    type User {
        username: String!
        password: String!
        error: String
    }

    type LoginUser {
        username: String!
        error: String
    }

    input UserInput {
        username: String!
        password: String!
    }


    type RootQuery {
        verifyToken(token: String!): User
    }
    
    type RootMutation {
        login(username: String!, password: String!): LoginUser
        createSellerAccount(userInputs: [UserInput!]!): [User!]!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
