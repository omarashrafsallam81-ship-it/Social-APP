import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { ThemeService } from '../../service-dark/service/theme.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { validators: this.confirmPassword, updateOn: 'submit' },
  );

  msgError: string = ' ';

  loding: boolean = false;

  registerSubcsribe: Subscription = new Subscription();

  confirmPassword(group: AbstractControl) {
    // password   , repassword

    const password = group.get('password')?.value;
    const repassword = group.get('rePassword')?.value;

    if (repassword !== password && repassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });

      return { mismatch: true };
    }
    return null;
  }

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.loding = true;

      this.registerSubcsribe.unsubscribe();

      this.registerSubcsribe = this.authService.SignUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.success) {
            // navigate login

            this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }
}
