import { Component } from '@angular/core';
import { InputComponent, ButtonComponent } from '../../components';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {} //todo: o inject

  loginForm = new FormGroup({
    username: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  login(): void {
    console.log(this.loginForm.value, this.loginForm.invalid)
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();

    const loginFormValue = this.loginForm.getRawValue();

    this.authService.login(loginFormValue).subscribe({
      next: () => {
        this.router.navigate(['/players'], { queryParams: { page: 1 } });
      },
      error: (err) => {
        console.error('login error', err);
      }
    });
  }
}
