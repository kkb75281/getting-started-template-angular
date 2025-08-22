import { Component } from '@angular/core';

@Component({
  selector: 'app-recover-account',
  standalone: true,
  imports: [],
  template: `
    <main>
      <a href="/">Back</a>
      <h1>Recover Account</h1>
      <p>
        Account recovery email has been sent to your email address.
        <br />
        Please check your email and follow the instructions to recover your
        account.
        <br />
        If you have not received the email, please check your spam folder.
      </p>
      <p>
        <strong>Note: </strong>You will not receive the recovery email if your
        account does not have a verified email address.
      </p>
    </main>
  `,
})
export class RecoverAccountComponent {}
