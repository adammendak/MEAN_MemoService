export interface IUser {
  username: String;
  password: String;
  email: String;
}

export class User implements IUser{
  username: String;
  password: String;
  email: String;

  constructor() {
  }

  setUsername(username: String) {
    this.username = username;
  }

  setPassword(password: String) {
    this.password = password;
  }

  setEmail(email: String) {
    this.email = email;
  }
}
