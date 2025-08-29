import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main>
      <a href="/">Back</a>
      <form (ngSubmit)="onLogin($event)">
        <h2>Login</h2>

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          [(ngModel)]="email"
          placeholder="Enter your email"
          name="email"
          required
        />

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          [(ngModel)]="password"
          placeholder="Enter your password"
          name="password"
          required
        />

        <button type="submit">Login</button>

        <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
      </form>
    </main>
  `,
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    skapi
      .getProfile()
      .then((user) => {
        console.log('현재 사용자:', user);
        if (user) {
          this.router.navigate(['/welcome']);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  onLogin(e: Event) {
    skapi
      .login({
        email: this.email,
        password: this.password,
      })
      .then(() => {
        this.router.navigate(['/welcome']);
      })
      .catch(async (err) => {
        if (err.code === 'USER_IS_DISABLED') {
          let recover = window.confirm(
            'Your account is disabled. Would you like to recover your account?'
          );
          if (recover) {
            await skapi.recoverAccount();
            this.router.navigate(['/recover-account']);
            return;
          }
        } else {
          alert(err.message);
        }
      });
  }
}
