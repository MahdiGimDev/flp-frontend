import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginModel = {
    email: '',
    password: '',
  };
  errorLogin = '  ';
  constructor(private authService: AuthService, private route: Router, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.loginModel.email = params['email'];
    });
  }
  ngOnDestroy() {}

  async onLogin() {
    this.errorLogin = '';
    try {
      const data = await this.authService.loginUser(this.loginModel.email.trim(), this.loginModel.password).toPromise();
      this.authService.setToken(data.accessToken);
      this.route.navigateByUrl('/dashboard');
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = 'Internal server';
      }
    }
  }

  googleAuth() {
    window.location.href = `${environment.backend}/auth/google`;
  }
}
