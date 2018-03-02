import {MemosComponent} from "./memos/memos.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AddMemosComponent} from "./memos/add-memos/add-memos.component";
import {AboutComponent} from "./about/about.component";
import {LoginUserComponent} from "./user/login-user/login-user.component";
import {RegisterUserComponent} from "./user/register-user/register-user.component";

export const routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'memos', component: MemosComponent},
  {path: 'memos/add', component: AddMemosComponent},
  {path: 'user/login', component: LoginUserComponent},
  {path: 'user/register', component: RegisterUserComponent},
  //in development problem with this
  {path: 'user', loadChildren: 'app/user/user.module#UserModule'},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'}
];
