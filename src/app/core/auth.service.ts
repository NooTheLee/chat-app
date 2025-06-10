import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../store/models/user.model';
import * as AppActions from '../store/app.actions';
import * as AppSelectors from '../store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) {}

  // Selectors
  get currentUser$(): Observable<User | null> {
    return this.store.select(AppSelectors.selectUser);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.store.select(AppSelectors.selectIsAuthenticated);
  }

  // Actions
  login(user: User): void {
    this.store.dispatch(AppActions.setUser({ user }));
  }

  updateUserProfile(userData: Partial<User>): void {
    this.store.dispatch(AppActions.updateUser({ user: userData }));
  }

  logout(): void {
    this.store.dispatch(AppActions.clearUser());
  }

  setOnlineStatus(isOnline: boolean): void {
    this.store.dispatch(AppActions.setUserOnlineStatus({ isOnline }));
  }
} 