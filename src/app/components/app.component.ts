import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  protected title = 'Client';
  constructor(private authStateService: AuthStateService) {}

  ngOnInit(): void {
    // get user from local storage and set to global state
    this.setUserFromLocalStorage();
  }

  setUserFromLocalStorage = (): void => {
    const user = localStorage.getItem('user');
    if (user) this.authStateService.setUser(JSON.parse(user));
  };
}
