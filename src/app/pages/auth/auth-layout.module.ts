import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { NbIconModule } from '@nebular/theme';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NbIconModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleAuthComponent,
    RegisterSuccessComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AccountVerificationComponent,
  ],
})
export class AuthLayoutModule {}
