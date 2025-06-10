import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    const token = localStorage.getItem('token');
    if (token) return this.router.navigate(['/home']);
    return true;
  }
}
