import { gql } from "@apollo/client";

const register = gql`
  mutation createSellerAccount($userInputs: [UserInput!]!) {
    createSellerAccount(userInputs: $userInputs) {
      username
    }
  }
`;

const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
    }
  }
`;

export { register, login };
