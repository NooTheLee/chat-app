import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthStateService, ChatRoomService, ChatRoomsStateService } from '../../../core';
import {
  ChatRoomDtos,
  ChatRoomDto,
  ChatMessageDto,
} from '../../../models';

@Component({
  selector: 'chat-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'chatroom.component.html',
})
export class ChatRoom implements OnInit {
  chatrooms: ChatRoomDtos = [];
  loading: boolean = false;
  userId: string = '';

  constructor(
    private chatRoomService: ChatRoomService,
    private authStateService: AuthStateService,
    private chatRoomsStateService: ChatRoomsStateService,
  ) {}

  // ComponentDidMount
  ngOnInit(): void {
    this.loadChatrooms();
    this.authStateService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.chatRoomsStateService.chatrooms$.subscribe(cr => {
      this.chatrooms = cr;
    })
  }

  loadChatrooms(): void {
    this.loading = true;
    this.chatRoomService
      .getAll()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: ChatRoomDtos) => {
          this.chatRoomsStateService.setChatRooms(response);
          this.chatRoomsStateService.setCurrentId(response[0].id);
        },
        error: (error) => {
          console.error('Error loading chatrooms:', error);
        },
      });
  }

  getChatName = (chatRoomDto: ChatRoomDto) => {
    if (chatRoomDto.isGroup) {
      return 'J97';
    }
    const userId = this.userId;
    const { members } = chatRoomDto;
    const other = members.find((mem) => mem.id !== userId);

    return other?.displayName ?? other?.username;
  };

  getLastMessenger = (messages: ChatMessageDto[]) => {
    const lastMessage: ChatMessageDto = messages[messages.length - 1];
    const { sender, content } = lastMessage;

    const userId = this.userId;

    let lastSender: string = sender.displayName ?? sender.username;
    if (userId === sender.id) lastSender = 'You';

    return `${lastSender}: ${content}`;
  };
}
