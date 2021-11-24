import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction)
{
    const authToken = request.headers.authorization;

    if(!authToken)
    {
        return response.status(401).json({
            message: "Unauthorized"
        });
    }

    const [, token] = authToken.split(" ");

    try {
        
        verify(token, "YjEyMWFlOTAtZDgyNC00NTg2LTg3MjMtMjE5Zjg4OTRjOTRiOg==");
        return next();

    } catch (error) {
        
        return response.status(401).json({
            message: "Token invalid"
        });

    }
}