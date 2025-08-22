import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-remove-account',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <a routerLink="/welcome">Back</a>
      <h1>Remove Account</h1>
      <h3>Would you like to remove your account?</h3>
      <p>
        Once you remove your account, your account will still be recoverable
        within 6 months by logging in and verifying your email address.
        <br />
        After 6 months, all your data will be deleted and cannot be recovered.
      </p>
      <p>
        <strong>Note: </strong>Your account cannot be recovered if you have not
        verified your email address.
      </p>
      <p>If you like to proceed, please click the button below.</p>
      <button type="button" (click)="onRemoveAccount()" [disabled]="isLoading">
        {{ isLoading ? 'Loading...' : 'Remove Account' }}
      </button>
    </main>
  `,
})
export class RemoveAccountComponent implements OnInit {
  isLoading: boolean = false;

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

  async onRemoveAccount(): Promise<void> {
    if (window.confirm('Are you sure you want to remove your account?')) {
      this.isLoading = true;
      try {
        await skapi.disableAccount();
        alert('Your account is removed.');
        this.router.navigate(['/']);
      } catch (err) {
        alert(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
