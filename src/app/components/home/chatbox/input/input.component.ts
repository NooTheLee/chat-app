import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
//
import { ChatRoomsStateService, MessageService } from '@/core';

@Component({
  selector: 'message-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
})
export class MessageInput {
  @Input() userId: string = '';

  @Output() onChangeF = new EventEmitter<void>();
  @Output() onBlurF = new EventEmitter<void>();

  // local
  message: string = '';
  currentChatId: string = '';
  loading: boolean = false;

  constructor(private messageService: MessageService, private chatroomStateService: ChatRoomsStateService) {
    this.chatroomStateService.currentChatRoomId$.subscribe(crId => {
        this.currentChatId = crId
    })
  }

  onChange = (value: any) => {
    this.onChangeF.emit();
  };

  onBlur = () => {
    this.onBlurF.emit();
  };

  onSubmit = () => {
    if (!this.message || this.message.trim() === '' || this.loading) {
      return;
    }
    
    this.loading = true;
    this.messageService.sentMessage({
        chatRoomId: this.currentChatId,
        content: this.message,
        messageType: 1,
    }).pipe(finalize(() => {
        this.loading = false;
    })).subscribe(response => {
        this.chatroomStateService.addNewMessageToCurrentChatRoom(response);
        this.message = "";
    })
  }
}
