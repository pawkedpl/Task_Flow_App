import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { TasksComponent } from './tasks/tasks';
import { LayoutComponent } from './layout/layout';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'tasks', component: TasksComponent },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
