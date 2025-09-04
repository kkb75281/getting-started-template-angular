import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { skapi } from '../../main';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <h1>Skapi Angular Starter Template</h1>
      <p>This project is an Angular starter template using Skapi.</p>
      <p>It includes the following basic features:</p>
      <ul>
        <li>Signup</li>
        <li>Signup email verification</li>
        <li>Login</li>
      </ul>

      <br />

      <h2>Important!</h2>
      <p>
        Replace the SERVICE_ID and OWNER_ID values in src/main.ts with your own
        service information.
      </p>
      <p>
        You can get your own service ID from
        <a href="https://www.skapi.com">Skapi</a>.
      </p>

      <br />

      <p style="font-weight: bold">Login or Sign-up below:</p>
      <a routerLink="/login">Login</a>
      <span> | </span>
      <a routerLink="/signup">Signup</a>
    </main>
  `,
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    skapi
      .getProfile()
      .then((user) => {
        if (user) {
          console.log(user);
          this.router.navigate(['/welcome']);
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }
}
