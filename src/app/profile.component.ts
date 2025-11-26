import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  template: `
    <div class="card">
      <h2>Профіль</h2>
      <p>Ця сторінка захищена. Ви авторизовані.</p>
      <p>Стан авторизації: <strong>{{ auth.isAuthenticated() ? 'так' : 'ні' }}</strong></p>
    </div>
  `
})
export class ProfileComponent {
  auth = inject(AuthService);
}
