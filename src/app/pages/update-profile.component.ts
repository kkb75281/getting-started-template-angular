import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  template: `
    <main>
      <a href="/">Back</a>
      <form (ngSubmit)="onUpdateProfile($event)">
        <h2>Update Profile</h2>

        <label for="email">Login Email</label>
        <input
          type="email"
          [(ngModel)]="email"
          name="email"
          placeholder="your@email.com"
          required
        />

        <label for="name">Name</label>
        <input
          type="text"
          [(ngModel)]="name"
          name="name"
          placeholder="Your Name"
          required
        />

        <label for="date">Birthday</label>
        <input type="date" [(ngModel)]="birthdate" name="birthdate" />

        <div class="flex-wrap">
          <span>Email to Public</span>
          <input
            id="emailPublic"
            type="checkbox"
            [(ngModel)]="emailPublic"
            name="emailPublic"
            [disabled]="!emailVerified"
            style="margin-right:0"
          />
          <small *ngIf="!emailVerified" style="margin-left:8px">
            Email verification required
          </small>
        </div>

        <div class="flex-wrap" style="margin-top:4px">
          <span>Email Verified</span>
          <span>
            {{ emailVerified ? 'Yes' : 'No' }}
          </span>
          <button
            *ngIf="!emailVerified"
            type="button"
            (click)="handleVerifyEmail()"
          >
            Click to verify your email
          </button>
        </div>

        <div class="flex-wrap" style="margin:8px 0">
          <span>Password</span>
          <a routerLink="/change-password">Change Password</a>
        </div>

        <button type="submit">Update</button>
      </form>
    </main>
  `,
})
export class UpdateProfileComponent implements OnInit {
  user: any = null;
  email = '';
  name = '';
  birthdate = '';
  emailPublic = false;
  emailVerified = false;

  constructor(private router: Router) {}

  ngOnInit() {
    skapi
      .getProfile()
      .then((user) => {
        console.log('현재 사용자:', user);
        if (user) {
          this.email = user.email ? user.email : '';
          this.name = user.name ? user.name : '';
          this.birthdate = user.birthdate ? user.birthdate : '';
          this.emailPublic =
            Boolean(user.email_public) && Boolean(user.email_verified);
          this.emailVerified = Boolean(user.email_verified);
        } else {
          this.router.navigate(['/login']);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  async handleVerifyEmail() {
    if (!this.user) return;

    const userConfirm = window.confirm(
      `We will send a verification email to ${this.email}. Continue?`
    );

    if (userConfirm) {
      try {
        await skapi.verifyEmail();
        this.router.navigate(['/email-verification']);
      } catch (err) {
        alert(err);
      }
    }
  }

  async onUpdateProfile(e: Event) {
    e.preventDefault();

    try {
      await skapi.updateProfile({
        email: this.email,
        name: this.name,
        birthdate: this.birthdate,
        email_public: this.emailPublic,
      });

      this.router.navigate(['/welcome']);
    } catch (err) {
      alert(err);
    }
  }
}
