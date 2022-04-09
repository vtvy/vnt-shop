import { useMutation } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { login } from "./grapql-client/mutations";
import Admin from "./pages/Admin";

interface Account {
  username: string;
  password: string;
}

function App() {
  // const variables = [
  //     { username: "a", password: "b" },
  //     { username: "a", password: "b" },
  // ];

  // const { loading, error, data } = useQuery(register, {
  //     variables: {
  //         variables,
  //     },
  // });
  // if (loading) return <p>Loading ...</p>;
  // console.log(data);

  const [loginInput, dataMutaion] = useMutation(login);
  const [account, setAccount] = useState<Account>({
    username: "a",
    password: "b",
  });

  const handleLogin = () => {
    loginInput({
      variables: {
        username: account.username,
        password: account.password,
      },
    });
  };

  useEffect(() => {
    if (dataMutaion.called) {
      console.log(dataMutaion.data);
    }
  }, [dataMutaion]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={handleLogin}>login</button>
      </header> */}
      <Admin />
    </div>
  );
}

export default App;
