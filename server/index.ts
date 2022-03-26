import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import graphQLSchema from "./graphql/schema";
import graphQLResolvers from "./graphql/resolvers";

// Middleware
const app = express();
app.use(
    cors(),
    express.json(),
    bodyParser.json(),
    cookieParser(),
    express.urlencoded({ extended: false }),
    morgan("dev")
);

// use graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true,
    })
);

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URI}`);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};

connectDB();

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
