import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <main>
      <a href="/">Back</a>
      <form (ngSubmit)="onSignup($event)">
        <h2>Sign up</h2>
        <label for="email">Login Email</label>
        <input
          type="email"
          name="email"
          [(ngModel)]="email"
          placeholder="your@email.com"
          required
        />

        <label for="password">Set Password</label>
        <input
          type="password"
          name="password"
          [(ngModel)]="password"
          minlength="6"
          placeholder="At least 6 characters"
          required
        />

        <label for="name">Your Name</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="name"
          placeholder="Your name"
          required
        />
        <br />

        <button type="submit">Sign Up</button>

        <div style="text-align: center; margin-top: 10px;">
          <small>
            <a routerLink="/login">Already have an account?</a>
          </small>
        </div>
      </form>
    </main>
  `,
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';

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

  onSignup(e: Event) {
    e.preventDefault();

    if (!this.email.trim()) {
      alert('Please enter your email.');
      return;
    }
    if (!this.password.trim()) {
      alert('Please enter your password.');
      return;
    }

    let parameters = {
      email: this.email,
      password: this.password,
      name: this.name,
    };

    let options = {
      signup_confirmation: true,
    };

    skapi
      .signup(parameters, options)
      .then(() => {
        alert('Signup successful!');
        this.router.navigate(['/signup-success']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
