import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { WelcomeComponent } from './pages/welcome.component';
import { SignupComponent } from './pages/signup.component';
import { SignupSuccessComponent } from './pages/signup-success.component';
import { UpdateProfileComponent } from './pages/update-profile.component';
import { ChangePasswordComponent } from './pages/change-password.component';
import { RemoveAccountComponent } from './pages/remove-account.component';
import { RecoverAccountComponent } from './pages/recover-account.component';
import { EmailVerificationComponent } from './pages/email-verification.component';
import { ForgotPasswordComponent } from './pages/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-success', component: SignupSuccessComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'remove-account', component: RemoveAccountComponent },
  { path: 'recover-account', component: RecoverAccountComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()],
};
