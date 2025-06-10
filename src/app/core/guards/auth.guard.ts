import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    const token = localStorage.getItem('token');
    if (token) return true;
    return this.router.navigate(['/login']);
  }
}
