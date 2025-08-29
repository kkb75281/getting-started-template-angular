import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-success',
  template: `
    <main>
      <h2>Success</h2>
      <p>
        Your signup has been successful. Please check your email for the
        confirmation link.
      </p>
      <a href="/">Index</a>
    </main>
  `,
})
export class SignupSuccessComponent {}
