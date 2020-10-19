import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../@core/auth/auth.service';
import { VerificationModel } from '../../../@core/models/auth.model';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css'],
})
export class AccountVerificationComponent implements OnInit {
  email = '';
  token = '';
  verifyMsg = '';
  isVerified = false;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
      this.verifyAccount();
    });
  }

  async verifyAccount() {
    try {
      this.verifyMsg = '';
      const model: VerificationModel = { email: this.email, token: this.token };
      const data = await this.authService.verifyAccount(model).toPromise();
      if (data.status) {
        this.isVerified = true;
      }
    } catch (error) {
      console.log({ error });
      this.verifyMsg = error?.error?.message;
    }
  }

  login() {
    this.route.navigate(['/login'], { queryParams: { email: this.email } });
  }
}
