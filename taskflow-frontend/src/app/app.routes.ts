import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { LayoutComponent } from './layout/layout';
import { TasksComponent } from './tasks/tasks';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guards';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
