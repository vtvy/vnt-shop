import { gql } from "@apollo/client";

const register = gql`
  mutation createSellerAccount($userInputs: [UserInput!]!) {
    createSellerAccount(userInputs: $userInputs) {
      username
      error
    }
  }
`;

const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }
`;
const resetPassword = gql`
  mutation resetPassword($username: String!) {
    resetPassword(username: $username) {
      username
    }
  }
`;

export { register, login, resetPassword };
