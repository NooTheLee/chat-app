import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoom } from './chatroom/chatroom.component';
import { ChatBox } from './chatbox/chatbox.component';
import { Details } from './details/details.component';
import { AuthService, ThemeService } from '../../core';
import { Observable } from 'rxjs';
import { User } from '../../store/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatRoom, ChatBox, Details],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;
  darkMode$: Observable<boolean>;
  
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.user$ = this.authService.currentUser$;
    this.darkMode$ = this.themeService.darkMode$;
  }
  
  ngOnInit(): void {
    // Set user as online when component initializes
    this.authService.setOnlineStatus(true);
  }
  
  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
} 