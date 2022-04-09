import { createSlice } from "@reduxjs/toolkit";
export type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  // helperText: string;
  // isError: boolean;
};
export type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean };
const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    isButtonDisabled: true,
  },
  reducers: {
    setUsername(state: State, action) {
      //immer.js
      state.username = action.payload;
    },
    setPassword(state: State, action) {
      state.password = action.payload;
    },
    setIsButtonDisabled(state: State, action) {
      state.isButtonDisabled = action.payload;
    },
  },
});
export const loginActions = loginSlice.actions
export default loginSlice;
