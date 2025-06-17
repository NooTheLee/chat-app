import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
//
import { ChatRoomsStateService, MessageService } from '@/core';

@Component({
  selector: 'add-new-member',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addNewMember.component.html',
})
export class AddNewMember {
  // local
  text: string = '';
  loading: boolean = false;

  constructor() {}

  onSubmit = () => {
    if (!this.text || this.text.trim() === '' || this.loading) {
      return;
    }
  };
}
