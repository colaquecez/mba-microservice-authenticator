import AuthRepository from "../repositories/AuthRepository";

import { LoginDTO } from "../repositories/interface";

class LoginUserService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public execute({ email, password }: LoginDTO) {
    const user = this.authRepository.login({
      email,
      password,
    });

    return user;
  }
}

export default LoginUserService;
