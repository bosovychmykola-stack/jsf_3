import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  template: `
  <div class="login-box">
    <h2>Вхід</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>Користувач</label>
      <input formControlName="username" placeholder="Admin">
      <label>Пароль</label>
      <input type="password" formControlName="password" placeholder="12345">
      <button type="submit">Увійти</button>
      <p class="error" *ngIf="error">{{error}}</p>
    </form>
    <p class="hint">Демо-дані: <strong>Admin</strong> / <strong>12345</strong></p>
  </div>
`

})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  error = '';

  form = this.fb.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });

  submit() {
    if (this.auth.login(this.form.value.username!, this.form.value.password!)) {
      this.error = '';
      this.router.navigateByUrl('/profile');
    } else {
      this.error = "Ім'я користувача або пароль введені невірно";
    }
  }
}
