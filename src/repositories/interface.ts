export interface UserDTO {
  username: string;
  email: string;
  password: string;
  fullname: string;
  phone: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ChangePasswordDTO {
  token: string;
  oldPassword: string;
  newPassword: string;
}
