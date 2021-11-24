import "express-async-errors";
import express, { Request, Response, NextFunction, response } from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) =>
    {
        if(error.message === 'User already exists!')
        {
            return response
            .status(303)
            .json({
                status: "Error",
                message: error.message
            });
        }

        if(error.message === 'User or password incorrect')
        {
            return response
            .status(200)
            .json({
                message: error.message
            });
        }
    });

app.listen(3000, () => console.log("Server online at port 3000"));