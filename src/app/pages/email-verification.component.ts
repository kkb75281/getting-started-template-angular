import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main>
      <a routerLink="/update-profile">Back</a>

      <form (ngSubmit)="handleSubmit()" style="margin-top: 2rem;">
        <h1>Email Verification</h1>
        <p>
          Please check your email for the verification code.
          <br />
          Enter the received code below and click verify.
        </p>
        <p>
          If you have not received the code, please check your spam folder.<br />
          Or click
          <button
            type="button"
            (click)="handleResendCode()"
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
        <div
          id="div_singleInput"
          style="display: flex; gap: 1rem; flex-direction: column;"
        >
          <input
            type="text"
            name="code"
            [(ngModel)]="code"
            placeholder="6 digits code"
            required
            style="padding: 0.5rem; font-size: 1rem; border-radius: 4px; border: 1px solid #ccc;"
          />
          <div style="text-align: right;">
            <input
              type="submit"
              [value]="isLoading ? 'Verifying...' : 'Verify'"
              [disabled]="isLoading"
              [ngStyle]="{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }"
            />
          </div>
        </div>
        <div
          *ngIf="error"
          class="error-message"
          [ngStyle]="{
            color: 'red',
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#ffebee',
            borderRadius: '4px'
          }"
        >
          {{ error }}
        </div>
      </form>
    </main>
  `,
})
export class EmailVerificationComponent implements OnInit {
  user: any = null;
  code: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {
    skapi
      .getProfile()
      .then((user) => {
        if (user) {
          this.user = user;
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch((err) => {
        window.alert(err.message);
        this.router.navigate(['/']);
      });
  }

  async handleResendCode() {
    if (!this.user) return;

    const userConfirm = window.confirm(
      `We will send a verification email to ${this.user.email}. Continue?`
    );

    if (userConfirm) {
      try {
        await skapi.verifyEmail();
        alert('Verification email has been sent.');
      } catch (err) {
        alert(err);
      }
    }
  }

  async handleSubmit() {
    this.isLoading = true;
    this.error = null;

    try {
      await skapi.verifyEmail({
        code: this.code,
      });

      alert('Your email is verified.');
      this.router.navigate(['/update-profile']);
    } catch (err) {
      this.error =
        typeof err === 'object' && err !== null && 'message' in err
          ? (err as { message: string }).message
          : String(err);
    } finally {
      this.isLoading = false;
    }
  }
}
