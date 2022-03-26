import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { ApolloProvider, useQuery, useMutation } from "@apollo/client";
import { register, login } from "./grapql-client/mutations";

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

    const [addUsers, dataMutaion] = useMutation(register);
    let datas = [
        {
            username: "a",
            password: "b",
        },
    ];
    async function fech() {
        const a = addUsers({
            variables: {
                userInputs: datas,
            },
        });
    }

    console.log(dataMutaion);

    // Nguyen
    const [loginInput, dataLogin] = useMutation(login);

    async function logins() {
        const a = await loginInput({
            variables: {
                username: "a",
                password: "b",
            },
        });
        console.log("this is ",a);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
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
                <button onClick={fech}>bam di</button>
                <button onClick={logins}>login</button>
            </header>
        </div>
    );
}

export default App;
