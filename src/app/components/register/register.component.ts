import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from '@/core';
import { ToastService } from '@/shared';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, confirmPassword, username, email } =
        this.registerForm.value;
      if (password !== confirmPassword) {
        this.toastService.show('Password are not the same!', 'warning');
        return;
      }

      this.loading = true;
      this.registerService
        .register({ username, password, email })
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: (response: any) => {
            this.toastService.show(response?.message + ". Let's login!", 'success');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          },
          error: (ex) => {
            const { error }: { error: any } = ex || {};
            console.log('error', error.message);
            if (error?.message)
              this.toastService.show(
                error.message || 'Something went wrong! Please try again!',
                'error'
              );
          },
        });
    }
  }
}
