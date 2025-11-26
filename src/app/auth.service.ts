import { Injectable, signal } from '@angular/core';

const AUTH_KEY = 'isAuthorized';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isAuth = signal<boolean>(this.readStorage());

  private readStorage(): boolean {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch { return false; }
  }

  isAuthenticated(): boolean {
    return this._isAuth();
  }

  login(username: string, password: string): boolean {
    const ok = username === 'Admin' && password === '12345';
    if (ok) {
      localStorage.setItem(AUTH_KEY, 'true');
      this._isAuth.set(true);
    } else {
      localStorage.removeItem(AUTH_KEY);
      this._isAuth.set(false);
    }
    return ok;
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
    this._isAuth.set(false);
  }
}
