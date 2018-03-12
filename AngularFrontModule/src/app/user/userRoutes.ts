import { LoginUserComponent } from "./login-user/login-user.component";
import { RegisterUserComponent } from "./register-user/register-user.component";

export const userRoutes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent }
];
