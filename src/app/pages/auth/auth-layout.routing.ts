import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { LayoutComponent } from '../layout/layout.component';
import { AnonymousGuard } from '../../@core/auth/anonymous.guard';
import { NbAuthComponent } from '@nebular/auth';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'register-success',
        component: RegisterSuccessComponent,
      },
      {
        path: 'google-auth/:token',
        component: GoogleAuthComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'verify-account',
        component: AccountVerificationComponent,
      },
    ],
  },
];
