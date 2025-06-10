import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'chatbox.component.html',
})
export class ChatBox {

  message: string = '';
  
  onChange = (value: any) => {
    console.log('value', value);
  }

  onBlur = () => {
    //
  }
}
