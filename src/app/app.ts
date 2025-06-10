import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toast],
  template: '<router-outlet></router-outlet><toast></toast>'
})
export class App {
  protected title = 'Client';
}
