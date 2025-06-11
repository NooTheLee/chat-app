import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ChatUserDto } from '../../../models';
import * as AppActions from '../../../store/app.actions';
import * as AppSelectors from '../../../store/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  constructor(private store: Store) {}

  // Selectors
  get user$(): Observable<ChatUserDto | null> {
    return this.store.select(AppSelectors.selectUser);
  }

  get userId$(): Observable<string> {
    return this.store.select(AppSelectors.selectUserId);
  }

  // Actions
  setUser(user: ChatUserDto): void {
    this.store.dispatch(AppActions.setUser({ user }));
  }

  updateUserProfile(userData: Partial<ChatUserDto>): void {
    this.store.dispatch(AppActions.updateUser({ user: userData }));
  }

  logout(): void {
    this.store.dispatch(AppActions.clearUser());
  }

  setOnlineStatus(isOnline: boolean): void {
    this.store.dispatch(AppActions.setUserOnlineStatus({ isOnline }));
  }
} 