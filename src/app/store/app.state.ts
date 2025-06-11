import { ChatUserDto } from '../models';
import { ChatRoomDtos } from '../models';

export interface AppState {
  user: ChatUserDto | null;
  darkMode: boolean;
  chatrooms: ChatRoomDtos | [],
  currentChatRoomId: string;
}