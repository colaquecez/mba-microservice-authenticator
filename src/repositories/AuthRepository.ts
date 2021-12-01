import User from "../models/User";
import jwt from "jsonwebtoken";
import Auth from "../models/User";
import { ChangePasswordDTO, LoginDTO, UserDTO } from "./interface";
import bcrypt from "bcrypt";

class AuthRepository {
  private users: Auth[];

  constructor() {
    this.users = [];
  }

  private hashPassword(password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        resolve(hash);
      });
    });
  }

  private async validateHashPassword(password: string, passwordHash: string) {
    const validate = await bcrypt.compare(password, passwordHash);
    return validate;
  }

  private async validateTokenJwt(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET!, (err, user) => {
        resolve(user);
      });
    });
  }

  private findUserByEmail(email: string) {
    const hasUser = this.users?.find?.((user) => user?.email === email);
    return hasUser;
  }

  private findIndexUser(email: string) {
    return this.users.findIndex((user) => user.email === email);
  }

  public async login({ email, password }: LoginDTO) {
    const user = this.findUserByEmail(email);

    if (user) {
      const validatePassword = await this.validateHashPassword(
        password,
        user.password!
      );

      if (validatePassword) {
        const token = jwt.sign(user.email, process.env.TOKEN_SECRET!);

        return {
          email: user.email,
          name: user.fullname,
          token,
        };
      }

      return {
        message: "Senha inválida",
        code: 403,
      };
    }

    return { message: "Usuário não encontrado", code: 404 };
  }

  public async create({ email, fullname, password, phone, username }: UserDTO) {
    if (this.findUserByEmail(email)) {
      return { message: "E-mail já cadastrado" };
    }

    const hashPassword = await this.hashPassword(password);

    const newUser = new User({
      email,
      fullname,
      password: hashPassword as string,
      phone,
      username,
    });
    this.users = [...this.users, newUser];

    return this.users;
  }

  public async changePassword({
    token,
    newPassword,
    oldPassword,
  }: ChangePasswordDTO) {
    if (!token) {
      return {
        mensagem: "Falha na autenticação",
        code: 404,
      };
    }

    const emailToken = (await this.validateTokenJwt(token)) as string;

    if (emailToken) {
      const user = this.findUserByEmail(emailToken);
      if (user) {
        const oldPasswordValidate = await this.validateHashPassword(
          oldPassword,
          user.password
        );

        if (oldPasswordValidate) {
          if (newPassword) {
            const userIndex = this.findIndexUser(emailToken);
            const hashPassword = await this.hashPassword(newPassword);
            this.users[userIndex].password = hashPassword as string;
            return {
              message: "Senha alterada com sucesso",
              code: 200,
            };
          }

          return {
            message: "Informe uma senha válida",
            code: 401,
          };
        }
        return {
          message: "Senha inválida",
          code: 401,
        };
      }
      return {
        message: "Houve um erro",
        code: 500,
      };
    }
    return {
      message: "Token inválido",
      code: 404,
    };
  }
}

export default AuthRepository;
