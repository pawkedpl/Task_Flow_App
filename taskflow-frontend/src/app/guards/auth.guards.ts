import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  // 🔐 jeśli token istnieje → wpuszczamy
  if (token && token !== 'null' && token !== 'undefined') {
    return true;
  }

  // 🚫 brak tokena → przekierowanie na login
  router.navigate(['/login']);
  return false;
};
