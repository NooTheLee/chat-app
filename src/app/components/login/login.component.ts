import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthStateService, LoginService } from '../../core';
import { ToastService } from '../../shared/toast/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private authStateService: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      const { username, password } = this.loginForm.value;
      this.loginService
        .login(username, password)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((response) => {
          const { token, user } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          this.toastService.show('Login successful!', 'success');

          this.authStateService.setUser(user);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        });
    }
  }
}
