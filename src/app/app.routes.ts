import { Routes } from '@angular/router';
import { HomeComponent, RegisterComponent, LoginComponent } from './components';
import { AuthGuard, GuestGuard } from './core';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: '**', redirectTo: '' }
];
