import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main>
      <a href="/">Back</a>
      <form (ngSubmit)="handleReset()">
        <h1>Reset Password</h1>
        <p>
          Enter the 6 digits verification code you may have received in your
          email and set new password below.
        </p>
        <p>
          If you have not received the code, please check your spam folder.
          <br />
          Or click
          <button
            onClick="{handleResendCode}"
            style="background: none;
            border: none;
            color: blue;
            text-decoration: underline;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
            width: unset;"
          >
            HERE
          </button>
          to resend.
        </p>
        <input type="email" name="email" [(ngModel)]="email" readOnly hidden />
        <div>
          <label for="code">Verification Code</label>
          <input
            id="code"
            type="text"
            [(ngModel)]="code"
            name="code"
            required
            placeholder="6 digits code"
          />
        </div>
        <div>
          <label for="password">New Password</label>
          <input
            id="password"
            type="password"
            [(ngModel)]="password"
            name="password"
            required
            placeholder="New password"
          />
        </div>
        <div style="text-align: right;">
          <input type="submit" value="Reset Password" />
        </div>
        <div *ngIf="error" style="color: red; margin-top: 1rem;">
          {{ error }}
        </div>
        <p>
          <strong>Note: </strong>
          If your account's email address is not verified, you will not be able
          to reset your password.
        </p>
      </form>
    </main>
  `,
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  code: string = '';
  password: string = '';
  error: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {
    const emailParam = new URLSearchParams(window.location.search).get('email');
    if (emailParam) {
      this.email = emailParam;
    }
  }

  async handleReset() {
    this.error = null;

    try {
      await skapi.resetPassword({
        email: this.email,
        code: this.code,
        new_password: this.password,
      });

      alert('Password has been reset.');

      this.router.navigate(['/login']);
    } catch (err) {
      this.error =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'An error occurred while resetting the password.';
    }
  }
}
