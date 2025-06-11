import { createAction, props } from '@ngrx/store';
import { ChatUserDto, ChatRoomDtos, ChatMessageDto } from '../models';
import { ToastData, ToastType } from './app.state';

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

// Toast Actions
export const showToast = createAction(
  '[Toast] Show Toast',
  props<{ content: string; toastType: ToastType; time?: number }>()
);

export const hideToast = createAction(
  '[Toast] Hide Toast'
);

// Message Actions
export const addNewMessage = createAction(
  '[Message] Add new message',
  props<{ newMessage: ChatMessageDto }>()
);
