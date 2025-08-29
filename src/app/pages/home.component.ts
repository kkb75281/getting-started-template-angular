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
      <h1>Index</h1>
      <p>
        This is a HTML template for authentication features using
        <a href="https://www.skapi.com">Skapi</a>.
        <br />
        No CSS is used in this template. So don't let the design fool you.
        <br />
        This template packs full solid authentication features you can use in
        your HTML application.
      </p>
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
