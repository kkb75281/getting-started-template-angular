import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { skapi } from '../../main';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main>
      <a href="/">Back</a>

      <form (ngSubmit)="handleSubmit()" style="margin-top: 2rem;">
        <h1>Forgot Password</h1>
        <p>
          Input your login email address below and click on 'Submit'. You will
          receive an email with a 6 digits verification code for resetting your
          password.
        </p>

        <div>
          <label for="email" style="display: block; margin-bottom: 0.5rem"
            >Email Address</label
          >
          <input
            id="email"
            type="email"
            [(ngModel)]="email"
            name="email"
            placeholder="your@account.email"
            required
            style="
              width: 100%;
              padding: 0.5rem;
              font-size: 1rem;
              border-radius: 4px;
              border: 1px solid #ccc;
              margin: 0;
            "
          />
        </div>

        <div style="text-align: right;">
          <input
            type="submit"
            [value]="isLoading ? 'Submitting...' : 'Submit'"
            [disabled]="isLoading"
            style="
              padding: 0.5rem 1rem;
              font-size: 1rem;
              cursor: isLoading ? 'not-allowed' : 'pointer';
              opacity: isLoading ? 0.7 : 1
            "
          />
        </div>
        <div
          *ngIf="error"
          class="error-message"
          style="
            color: 'red';
            margin-top: '1rem';
            padding: '0.5rem';
            background-color: '#ffebee';
            border-radius: '4px';
          "
        >
          {{ error }}
        </div>

        <p style="margin-top: 1rem;">
          <strong>Note: </strong>
          If your account's email address is not verified, you will not be able
          to reset your password.
        </p>
      </form>
    </main>
  `,
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private router: Router) {}

  async handleSubmit() {
    if (!this.email.trim()) {
      this.error = 'Please enter your email address';
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      await skapi.forgotPassword({ email: this.email });

      this.router.navigate(['/reset-password'], {
        queryParams: { email: this.email },
      });
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        this.error = (err as { message: string }).message;
      } else {
        this.error = 'An unexpected error occurred.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}
