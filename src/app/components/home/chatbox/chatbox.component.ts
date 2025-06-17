import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
//
import { AuthStateService, ChatRoomsStateService } from '@/core';
import { DateTimeUtils } from '@/shared';
import { ChatMessageDto, ChatUserDto } from '@/models';
import { MessageInput } from './input/input.component';
import { AddNewMember } from './addNewMember/addNewMember.component';

@Component({
  selector: 'chat-box',
  standalone: true,
  imports: [CommonModule, MessageInput, AddNewMember],
  templateUrl: 'chatbox.component.html',
})
export class ChatBox {
  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef<HTMLDivElement>;

  chatMessages: ChatMessageDto[] = [];
  message: string = '';
  userId: string = '';
  otherProfile: ChatUserDto | undefined;
  convertDateTime: Function = DateTimeUtils.convertDateTime;
  isAddNewChatRoom: boolean = false;

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
    this.chatRoomStateService.isAddNewChatRoom$.subscribe((isNew) => {
      this.isAddNewChatRoom = isNew;
    });
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer)
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
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
