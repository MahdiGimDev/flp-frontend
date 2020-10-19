import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../@core/auth/auth.service';
import { ResetPasswordModel } from '../../../@core/models/auth.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email = '';
  token = '';
  resetMsg = '';
  resetForm: FormGroup;
  resetDone = false;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.resetForm = this.formBuilder.group(
      {
        password: [null, [Validators.compose([Validators.required, Validators.minLength(8)])]],
        confirmPassword: [null, [Validators.compose([Validators.required, Validators.minLength(8)])]],
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  async resetPassword() {
    this.resetMsg = '';
    const model: ResetPasswordModel = {
      email: this.email,
      password: this.resetForm.value.password,
      token: this.token,
    };
    try {
      const data = await this.authService.resetPassword(model).toPromise();
      if (data.status) {
        this.resetDone = true;
      }
    } catch (error) {
      console.log({ error });
      this.resetMsg = error?.error?.message;
    }
  }
  login() {
    this.route.navigate(['/login'], { queryParams: { email: this.email } });
  }
}
