import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { filter, finalize, take } from 'rxjs';
import {
  AuthStateService,
  ChatRoomService,
  ChatRoomsStateService,
} from '@/core';
import { ChatRoomDtos, ChatRoomDto, ChatMessageDto } from '@/models';
import { DateTimeUtils, LoadingService, ToastService } from '@/shared';
import { ContextDropdown } from './contextDropdown/context-dropdown';

@Component({
  selector: 'chat-room',
  standalone: true,
  imports: [CommonModule, ContextDropdown],
  templateUrl: 'chatroom.component.html',
})
export class ChatRoom implements OnInit {
  chatrooms: ChatRoomDtos = [];
  // loading: boolean = false;
  userId: string = '';
  currentChatRoomId: string = '';
  isAddNewChatRoom: boolean = false;
  chatRoomDeleteData: ChatRoomDto | null = null;

  constructor(
    private chatRoomService: ChatRoomService,
    private loadingService: LoadingService,
    private toast: ToastService,
    private authStateService: AuthStateService,
    private chatRoomsStateService: ChatRoomsStateService
  ) {}

  // ComponentDidMount
  ngOnInit(): void {
    this.loadChatrooms();
    this.authStateService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.chatRoomsStateService.chatrooms$.subscribe((cr) => {
      this.chatrooms = cr;
    });
    this.chatRoomsStateService.currentChatRoomId$.subscribe((crId) => {
      this.currentChatRoomId = crId;
    });
    this.chatRoomsStateService.isAddNewChatRoom$.subscribe((isNew) => {
      this.isAddNewChatRoom = isNew;
    });
  }

  loadChatrooms(): void {
    this.loadingService.setLoading(true);
    this.chatRoomService
      .getAll()
      .pipe(
        finalize(() => {
          this.loadingService.setLoading(false);
        })
      )
      .subscribe((response: ChatRoomDtos) => {
        this.chatRoomsStateService.setChatRooms(response);
        this.chatRoomsStateService.chatrooms$
          .pipe(
            filter((cr) => cr.length > 0),
            take(1)
          )
          .subscribe(() => {
            this.chatRoomsStateService.setCurrentChatRoomId(response[0].id);
          });
      });
  }

  getChatName = (chatRoomDto: ChatRoomDto | null) => {
    if (!chatRoomDto) return '';
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
    const { sender, content } = lastMessage || {};

    if (!sender || !sender) return '';

    const userId = this.userId;

    let lastSender: string = sender.displayName ?? sender.username;
    if (userId === sender.id) lastSender = 'You';

    return `${lastSender}: ${content}`;
  };

  getLastMessengerTime = (messages: ChatMessageDto[]) => {
    const lastMessage: ChatMessageDto = messages[messages.length - 1];
    const { createdAt } = lastMessage || {};
    return DateTimeUtils.convertDateTime(createdAt);
  };

  onAddNew = () => {
    this.chatRoomsStateService.setCurrentChatRoomId('');
    this.chatRoomsStateService.setIsAddNewChatRoom(true);
  };

  onSlectChatRoom = (crId: string): void => {
    this.chatRoomsStateService.setCurrentChatRoomId(crId);
    this.chatRoomsStateService.setIsAddNewChatRoom(false);
  };

  setCurrentDeleteChatroom = (chatRoomData: ChatRoomDto) => {
    this.chatRoomDeleteData = chatRoomData;
  };

  onDeleteChatRoom = () => {
    console.log('this.chatRoomDeleteData', this.chatRoomDeleteData);
    
    if (this.chatRoomDeleteData) {
      this.chatRoomService.deleteChatroom(this.chatRoomDeleteData.id).pipe(
        finalize(() => {
          this.toast.show('Delete chatroom successfully', 'infor');
        })
      ).subscribe(() => {
        // Remove the deleted chatroom from the state
        const updatedChatrooms = this.chatrooms.filter(cr => cr.id !== this.chatRoomDeleteData?.id);
        this.chatRoomsStateService.setChatRooms(updatedChatrooms);
        
        // Select the first chatroom if available
        if (updatedChatrooms.length > 0) {
          this.chatRoomsStateService.setCurrentChatRoomId(updatedChatrooms[0].id);
        }
      });
    }
    this.onCloseModalConfirm();
  };

  onCloseModalConfirm = () => {
    const btn = document.querySelector('form.modal-backdrop button') as HTMLButtonElement;
    if (btn) btn.click();
  }
}
