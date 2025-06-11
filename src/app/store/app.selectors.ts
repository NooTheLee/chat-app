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

export const selectMessagesByChatroomId = (
  chatroomId: string
): MemoizedSelector<object, ChatMessageDto[]> =>
  createSelector(
    selectChatRooms,
    (chatrooms) => chatrooms.find((cr) => cr.id === chatroomId)?.messages || []
  );

export const selectMemberByChatroomId = (
  chatroomId: string
): MemoizedSelector<object, ChatUserDto[]> =>
  createSelector(
    selectChatRooms,
    (chatrooms) => chatrooms.find((cr) => cr.id == chatroomId)?.members || []
  );
