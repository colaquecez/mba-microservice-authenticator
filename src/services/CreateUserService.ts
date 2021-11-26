import AuthRepository from "../repositories/AuthRepository";

import { UserDTO } from "../repositories/interface";

class CreateUserService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public execute({ email, fullname, password, phone, username }: UserDTO) {
    const user = this.authRepository.create({
      email,
      fullname,
      password,
      phone,
      username,
    });

    return user;
  }
}

export default CreateUserService;
