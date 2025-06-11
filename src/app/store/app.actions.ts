import { createAction, props } from '@ngrx/store';
import { ChatUserDto, ChatRoomDtos } from '../models';

// User Actions
export const setUser = createAction(
  '[Auth] Set User',
  props<{ user: ChatUserDto }>()
);

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: Partial<ChatUserDto> }>()
);

export const clearUser = createAction(
  '[Auth] Clear User'
)

export const setUserOnlineStatus = createAction(
  '[Auth] Set User Online Status',
  props<{ isOnline: boolean }>()
);

export const setChatRooms = createAction(
  '[Chatroom] Set Chat rooms',
  props<{ chatrooms: ChatRoomDtos }>()
);

export const updateChatRooms = createAction(
  '[Chatroom] Update Chat rooms',
  props<{ chatrooms: Partial<ChatRoomDtos> }>()
);

// Current chatroom id
export const setCurrentChatRoomId = createAction(
  '[Chatroom] Set Current chat room id',
  props<{ id: string }>()
);
