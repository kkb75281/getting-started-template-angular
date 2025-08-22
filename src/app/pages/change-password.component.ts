import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main>
      <a routerLink="/update-profile">Back</a>
      <form (ngSubmit)="onChangePassword($event)">
        <h2>Change Password</h2>
        <label for="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          [(ngModel)]="currentPassword"
          placeholder="Enter your current password"
          name="currentPassword"
          required
        />

        <label for="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          [(ngModel)]="newPassword"
          placeholder="Enter your new password"
          name="newPassword"
          required
        />

        <input
          type="submit"
          [value]="isLoading ? 'Changing...' : 'Change'"
          [disabled]="isLoading"
        />

        <div
          *ngIf="error"
          class="error-message"
          style="
            color: red;
            margin-top: 1rem;
            padding: 0.5rem;
            background-color: #ffebee;
            border-radius: 4px;
          "
        >
          {{ error }}
        </div>
      </form>
    </main>
  `,
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    skapi
      .getProfile()
      .then((user) => {
        if (!user) {
          this.router.navigate(['/']);
        }
      })
      .catch((err) => {
        window.alert(err.message);
        this.router.navigate(['/']);
      });
  }

  async onChangePassword(event: Event): Promise<void> {
    event.preventDefault();
    // Implement password change logic here

    if (!window.confirm('Are you sure you want to change your password?')) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      await skapi.changePassword({
        new_password: this.newPassword,
        current_password: this.currentPassword,
      });

      alert('Password has been changed.');

      this.router.navigate(['/update-profile']);
    } catch (err) {
      this.error =
        err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'An error occurred while changing the password.';
    } finally {
      this.isLoading = false;
    }
  }
}
