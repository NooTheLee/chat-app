import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatRoomService, ChatRoomResponseDto, ChatRoomDto, MessageDto } from '../../../core';
import { finalize } from 'rxjs';

@Component({
  selector: 'chat-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'chatroom.component.html',
})
export class ChatRoom implements OnInit {
  chatrooms: ChatRoomResponseDto = [];
  loading: boolean = false;
  constructor(private chatRoomService: ChatRoomService ) {}

  // ComponentDidMount
  ngOnInit(): void {
    this.loadChatrooms();
  }

  loadChatrooms(): void {
    this.loading = true;
    this.chatRoomService.getAll().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response: any) => {
        this.chatrooms = response as ChatRoomResponseDto;
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
    const userId = '6416bf2e-83bb-4cf7-a57a-ff78e1720a10';
    const { members } = chatRoomDto;
    const other = members.find(mem => mem.id !== userId);

    return other?.displayName ?? other?.username;
  }

  getLastMessenger = (messages: MessageDto[] ) => {
    const lastMessage: MessageDto = messages[messages.length - 1];
    const { sender, content } = lastMessage;

    const userId = '6416bf2e-83bb-4cf7-a57a-ff78e1720a10';
    
    let lastSender: string = sender.displayName ?? sender.username;
    if (userId === sender.id) lastSender = 'You';
    
    return `${lastSender}: ${content}`;
  }
}
