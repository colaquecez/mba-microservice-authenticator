import { Router } from "express";
import AuthRepository from "../repositories/AuthRepository";
import {
  ChangePasswordDTO,
  LoginDTO,
  UserDTO,
} from "../repositories/interface";
import ChangePasswordService from "../services/ChangePasswordService";
import CreateUserService from "../services/CreateUserService";
import LoginUserService from "../services/LoginUserService";

const authRouter = Router();

const authRepository = new AuthRepository();

authRouter.post("/register", async (request, response) => {
  const { email, fullname, password, phone, username } =
    request.body as UserDTO;

  try {
    const createUser = new CreateUserService(authRepository);

    const user = await createUser.execute({
      email,
      fullname,
      password,
      phone,
      username,
    });

    return response.json(user);
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/login", async (request, response) => {
  const { email, password } = request.body as LoginDTO;

  try {
    const login = new LoginUserService(authRepository);

    const user = await login.execute({
      email,
      password,
    });

    response.status(user.code || 200).send({ message: user.message, ...user });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/password", async (request, response) => {
  const { newPassword, oldPassword, token } = request.body as ChangePasswordDTO;

  try {
    const login = new ChangePasswordService(authRepository);

    const user = await login.execute({
      newPassword,
      oldPassword,
      token,
    });

    response.status(user.code || 200).send({ message: user.message });
  } catch (error) {
    console.log(error);
  }
});

export default authRouter;
