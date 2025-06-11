import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthStateService, ChatRoomsStateService } from '../../../core';
import { ChatMessageDto } from '../../../models';

@Component({
  selector: 'chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'chatbox.component.html',
})
export class ChatBox {
  chatMessages: ChatMessageDto[] = [];
  message: string = '';
  userId: string = '';

  constructor(
    private chatRoomStateService: ChatRoomsStateService,
    private authStateService: AuthStateService
  ) {
    this.chatRoomStateService.getCurrentChatRoomMessages().subscribe((cm) => {
      this.chatMessages = cm;
    });
    this.authStateService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  convertDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      year: '2-digit',
    });
  };

  isYou = (message: ChatMessageDto): boolean => {
    return message.sender.id === this.userId;
  };

  onChange = (value: any) => {
    console.log('value', value);
  };

  onBlur = () => {
    //
  };
}
