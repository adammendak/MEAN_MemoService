import {MemosComponent} from "./memos/memos.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AddMemosComponent} from "./memos/add-memos/add-memos.component";
import {AboutComponent} from "./about/about.component";

export const routes = [
  {path: 'about', component:AboutComponent},
  {path: 'memos', component: MemosComponent},
  {path: 'memos/add', component: AddMemosComponent},
  {path: '', component: WelcomeComponent},
];
