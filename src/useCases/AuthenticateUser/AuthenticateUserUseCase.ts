import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { client } from "../../prisma/client";

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUserUseCase 
{
    async execute({ username, password }: IRequest)
    {
        // Verify if user exists

        const userAlreadyExists = await client.user.findFirst({
            where:{
                username
            }
        });

        if(!userAlreadyExists)
        {
            throw new Error("User or password incorrect");
        }

        // Verify if the password is correct

        const passwordMatch = await compare(password, userAlreadyExists.password);

        if(!passwordMatch)
        {
            throw new Error("User or password incorrect");
        }

        // Generate user's token
        const token = sign({}, "YjEyMWFlOTAtZDgyNC00NTg2LTg3MjMtMjE5Zjg4OTRjOTRiOg==", {
            subject: userAlreadyExists.id,
            expiresIn: "20s"
        });


        return { token };
    }
}

export { AuthenticateUserUseCase };