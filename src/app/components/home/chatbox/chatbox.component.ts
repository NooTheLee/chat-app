import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';

import { AuthStateService, ChatRoomsStateService } from '../../../core';
import { ChatMessageDto, ChatUserDto } from '../../../models';
import { MessageInput } from './input/input.component';
import { DateTimeUtils } from '../../../shared';

@Component({
  selector: 'chat-box',
  standalone: true,
  imports: [CommonModule, MessageInput],
  templateUrl: 'chatbox.component.html',
})
export class ChatBox {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;


  chatMessages: ChatMessageDto[] = [];
  message: string = '';
  userId: string = '';
  otherProfile: ChatUserDto | undefined;
  convertDateTime: Function = DateTimeUtils.convertDateTime;

  constructor(
    private chatRoomStateService: ChatRoomsStateService,
    private authStateService: AuthStateService
  ) {
    this.chatRoomStateService.getCurrentChatRoomMessages().subscribe((cm) => {
      this.chatMessages = cm;
      this.scrollToBottom();
    });
    this.authStateService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.chatRoomStateService.getOtherMember().subscribe((m) => {
      this.otherProfile = m;
    });
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer)
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.warn('Scroll failed:', err);
    }
  }

  onChangeF = () => {
    console.log('Call onChangeF from children');
  };

  onBlurF = () => {
    console.log('Call onBlurF from children');
  };

  getShowingName = () => {
    return this.otherProfile?.displayName ?? this.otherProfile?.username;
  };

  isYou = (message: ChatMessageDto): boolean => {
    return message.sender.id === this.userId;
  };
}
