import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoom } from './chatroom/chatroom.component';
import { ChatBox } from './chatbox/chatbox.component';
import { Details } from './details/details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatRoom, ChatBox, Details],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
