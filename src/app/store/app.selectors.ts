import {
  createSelector,
  createFeatureSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { AppState } from './app.state';
import { ChatUserDto, ChatMessageDto } from '../models';

// Feature selector
export const selectAppState = createFeatureSelector<AppState>('app');

// User selectors
export const selectUser = createSelector(
  selectAppState,
  (state: AppState) => state.user
);

export const selectUserId = createSelector(
  selectUser,
  (user) => user?.id || ''
);

export const selectIsUserOnline = createSelector(
  selectUser,
  (user) => user?.isOnline || false
);

// Chatrooms selectors
export const selectChatRooms = createSelector(
  selectAppState,
  (state: AppState) => state.chatrooms
);

export const selectCurrentChatRoomId = createSelector(
  selectAppState,
  (state: AppState) => state.currentChatRoomId
);

// Toast selectors
export const selectToast = createSelector(
  selectAppState,
  (state: AppState) => state.toast
);
