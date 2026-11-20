import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ThemeService } from './../../service-dark/service/theme.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  private readonly fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    },
    { updateOn: 'submit' },
  );

  // loginForm: FormGroup = new FormGroup(
  //   {
  //     email: new FormControl('', [Validators.required, Validators.email]),

  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  //     ]),
  //   },
  //   { updateOn: 'submit' },
  // );

  msgError: string = ' ';

  loding: boolean = false;

  loginSubcsribe: Subscription = new Subscription();

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loding = true;

      this.loginSubcsribe.unsubscribe();
      this.loginSubcsribe = this.authService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('socialUser', JSON.stringify(res.data.user));
            // navigate feed

            this.router.navigate(['/feed']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.loding = false;
        },
        complete: () => {
          this.loding = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
