import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core';
//
import { ChatRoomDto } from '@/models';

@Component({
    selector: 'context-dropdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'context-dropdown.html'
})
export class ContextDropdown {
    @Input() id: string = '';
    @Input() chatroomData!: ChatRoomDto;
    
    @Output() setCurrentDeleteChatroom = new EventEmitter<ChatRoomDto>();

    onClickDeleteChatRoom() {
        this.setCurrentDeleteChatroom.emit(this.chatroomData);
    }
}