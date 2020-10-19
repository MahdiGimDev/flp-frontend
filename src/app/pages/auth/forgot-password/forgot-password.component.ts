import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resetMsg = '';
  requestSent = false;
  email = '';
  constructor(
    private router: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.resetForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:_!-#$%^&*+-\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ),
        ]),
      ],
    });
  }
  ngOnInit(): void {}

  async sendReset() {
    this.resetMsg = '';
    try {
      this.email = this.resetForm.value.email;
      const data = await this.authService
        .forgotPassword(this.email)
        .toPromise();
      if (data.status) {
        this.requestSent = true;
      }
    } catch (error) {
      console.log({ error });
      this.resetMsg = error?.error?.message;
    }
  }
}
