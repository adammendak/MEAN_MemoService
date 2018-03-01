import {MemosComponent} from "./memos/memos.component";
import {WelcomeComponent} from "./welcome/welcome.component";

export const routes = [
  {path: '', component: WelcomeComponent},
  {path: 'memos', component: MemosComponent}
];
