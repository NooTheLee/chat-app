export interface ChatUserDto {
  id: string;
  username: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  isOnline: boolean;
  lastSeen: string | null;
}

export interface ChatMessageDto {
  id: string;
  content: string;
  userId: string;
  messageType: number;
  isEdited: boolean;
  editedAt: string | null;
  createdAt: string;
  updatedAt: string;
  sender: ChatUserDto;
}

export interface ChatRoomDto {
  id: string;
  name: string;
  description: string;
  isGroup: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessageDto[];
  members: ChatUserDto[];
}

export type ChatRoomDtos = ChatRoomDto[];
