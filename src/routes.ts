import { response, Router } from "express";
import { CreateUserController } from "./useCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/AuthenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/endureAuthenticated";

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

routes.post("/users", createUserController.handle);
routes.post("/login", authenticateUserController.handle);

routes.get("/courses", ensureAuthenticated, (request, response) => {
    return response.json([
        { id: 1, name: "NodeJS"},
        { id: 1, name: "ReactJS"},
        { id: 1, name: "React Native"},
        { id: 1, name: "Flutter"},
        { id: 1, name: "Elixir"}
    ]);
});

export { routes };