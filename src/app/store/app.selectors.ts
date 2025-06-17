import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { AppState } from './app.state';

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

export const selectIsAddNewChatRoom = createSelector(
  selectAppState,
  (state: AppState) => state.isAddNewChatRoom
);

// Toast selectors
export const selectToast = createSelector(
  selectAppState,
  (state: AppState) => state.toast
);

// loading selectors
export const selectLoading = createSelector(
  selectAppState,
  (state: AppState) => state.loading
);
