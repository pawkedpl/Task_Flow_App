import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { TasksComponent } from './tasks/tasks';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] }
];
