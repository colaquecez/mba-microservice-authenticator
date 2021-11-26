import AuthRepository from "../repositories/AuthRepository";

import { ChangePasswordDTO } from "../repositories/interface";

class ChangePasswordService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public execute({ token, oldPassword, newPassword }: ChangePasswordDTO) {
    const user = this.authRepository.changePassword({
      newPassword,
      oldPassword,
      token,
    });

    return user;
  }
}

export default ChangePasswordService;
