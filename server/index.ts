import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
} from "apollo-server-core";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import typeDefs from "./graphql/schema";
import graphQLResolvers from "./graphql/resolvers";
import resolvers from "./graphql/resolvers/auth";
import { createServer } from "http";

// Middleware
// const app = express();
// app.use(
//     cors(),
//     express.json(),
//     bodyParser.json(),
//     cookieParser(),
//     express.urlencoded({ extended: false }),
//     morgan("dev")
// );

// // use graphql
// app.use(
//     "/graphql",
//     graphqlHTTP({
//         schema: graphQLSchema,
//         rootValue: graphQLResolvers,
//         graphiql: true,
//     })
// );

// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.DB_URI}`);
//         console.log("Database connected");
//     } catch (error) {
//         console.log(error);
//     }
// };

// connectDB();

// // server listening
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}/graphql`);
// });

const main = async () => {
    await mongoose.connect(`${process.env.DB_URI}`);

    const app = express();

    app.use(
        cors(),
        express.json(),
        bodyParser.json(),
        cookieParser(),
        express.urlencoded({ extended: false }),
        morgan("dev")
    );

    const httpServer = createServer(app);

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    });
    const PORT = process.env.PORT || 5000;
    apolloServer.listen(PORT).then(({ url }) => {
        console.log(`The endpoint of Graphql is: ${url}`);
    });
};

main().catch((error) => console.log(error));
