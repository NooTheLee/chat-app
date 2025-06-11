import { ChatUserDto } from '../models';
import { ChatRoomDtos } from '../models';

export type ToastType = 'success' | 'error' | 'warning' | 'infor';

export interface ToastData {
  content: string;
  toastType: ToastType;
}

export interface AppState {
  user: ChatUserDto | null;
  darkMode: boolean;
  chatrooms: ChatRoomDtos | [],
  currentChatRoomId: string;
  toast: ToastData | null;
}