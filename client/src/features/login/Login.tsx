import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Avatar, Box, Link } from "@material-ui/core";
import { login } from "../../grapql-client/mutations";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
    WelcomeTitle: {
      display: "block",
      margin: "auto",
    },
    sx: {
      width: 82,
      height: 82,
      margin: "auto",
    },
  })
);
// state type
type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  // helperText: string;
  // isError: boolean;
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  // helperText: "",
  // isError: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  // | { type: "loginSuccess"; payload: string }
  // | { type: "loginFailed"; payload: string }
  // | { type: "setIsError"; payload: boolean };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    // case "loginSuccess":
    //   return {
    //     ...state,
    //     helperText: action.payload,
    //     isError: false,
    //   };
    // case "loginFailed":
    //   return {
    //     ...state,
    //     helperText: action.payload,
    //     isError: true,
    //   };
    // case "setIsError":
    //   return {
    //     ...state,
    //     isError: action.payload,
    //   };
  }
};
export const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.password]);
  //triggers when login button is clicked

  const [loginInput, dataLogin] = useMutation(login);
  // const handleLogin = () => {
  //   if (state.username === "a" && state.password === "b") {
  //     dispatch({
  //       type: "loginSuccess",
  //       payload: "Login Successfully",
  //     });
  //   } else {
  //     dispatch({
  //       type: "loginFailed",
  //       payload: "Incorrect username or password",
  //     });
  //   }
  // };
  const handleLogin = () => {
    const a = loginInput({
      variables: {
        username: state.username,
        password: state.password,
      },
    });
    console.log(a);
  };
  // submit form when a user presses the Return key
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };
  // listens to change event on username textField and dispatches

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };
  // handle forgot password
  // const handleForgot = () {

  // }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Box className={classes.WelcomeTitle}>
        <h1>Welcome to VNT</h1>
        <Avatar alt="Avatar" src="" className={classes.sx} />
      </Box>
      <Card className={classes.card}>
        <CardHeader className={classes.header} />
        <CardContent>
          <div>
            <TextField
              // error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              // error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              // helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            <Link href="#" underline="none" /*onClick={handleForgot}*/>
              Forgot password ?
            </Link>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};