import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services';
import { HttpClient } from '@angular/common/http';

export const authGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const authService = inject(AuthService);
  
  if (!authService.isAuthenticated()) return router.createUrlTree(["/login"]);
  
  return authService.isAuthenticated()
};
