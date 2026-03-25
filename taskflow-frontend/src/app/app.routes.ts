import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { LayoutComponent } from './layout/layout';
import { TasksComponent } from './tasks/tasks';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'tasks',
        component: TasksComponent,
        runGuardsAndResolvers: 'always'
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
