import { v4 } from "uuid";

class User {
  id: string;
  username: string;
  email: string;
  password: string;
  fullname: string;
  phone: string;
  user_created: Date;

  constructor({
    username,
    email,
    password,
    fullname,
    phone,
  }: Omit<User, "id" | "user_created">) {
    this.id = v4();
    this.username = username;
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.phone = phone;
    this.user_created = new Date();
  }
}

export default User;
