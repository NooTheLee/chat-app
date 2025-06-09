import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  contacts = [
    { 
      name: 'Kush Gibson', 
      lastMessage: 'Sed porta moles...', 
      time: '8 min ago', 
      color: 'red', 
      initials: 'KG' 
    },
    { 
      name: 'Susannah Halliday', 
      lastMessage: 'Commodo magna...', 
      time: '03:56 PM', 
      color: 'orange', 
      initials: 'SH' 
    },
    { 
      name: 'Camron Barry', 
      lastMessage: 'Praesent tristique...', 
      time: '05:14 PM', 
      color: 'yellow', 
      initials: 'CB' 
    },
    { 
      name: 'Milo Christie', 
      lastMessage: 'Nam lacinia...', 
      time: 'Yesterday', 
      color: 'yellow', 
      initials: 'MC' 
    },
    { 
      name: 'Aiden Forbes', 
      lastMessage: 'Ut vitae hendrerit...', 
      time: 'Yesterday', 
      color: 'green', 
      initials: 'AF' 
    },
    { 
      name: 'Bethan Webb', 
      lastMessage: 'Fusce vel metus...', 
      time: 'Wed', 
      color: 'green', 
      initials: 'BW' 
    },
    { 
      name: 'Barbara Dejesus', 
      lastMessage: 'Mauris varius in...', 
      time: 'Wed', 
      color: 'blue', 
      initials: 'BD' 
    },
    { 
      name: 'Damon Mccarty', 
      lastMessage: 'Ut venenatis elit est...', 
      time: 'Thu', 
      color: 'purple', 
      initials: 'DM' 
    },
    { 
      name: 'Timothy Ryan', 
      lastMessage: 'Donec commodo...', 
      time: 'Thu', 
      color: 'purple', 
      initials: 'TR' 
    }
  ];
  
  constructor() { }
} 