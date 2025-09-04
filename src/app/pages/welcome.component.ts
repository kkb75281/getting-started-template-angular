import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { skapi } from '../../main';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <main>
      <h1>Login Success</h1>
      <p id="WelcomeMessage">
        Welcome, {{ user?.name || user?.email || user?.user_id }}!
      </p>
      <pre id="UserInfo">{{ user | json }}</pre>
      <button id="logoutBtn" (click)="handleLogout()">Logout</button>
    </main>
  `,
})
export class WelcomeComponent implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    skapi
      .getProfile()
      .then((user) => {
        if (!user) {
          this.router.navigate(['/login']);
        } else {
          this.user = user;
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  async handleLogout() {
    await skapi.logout();
    this.router.navigate(['/']);
  }
}
