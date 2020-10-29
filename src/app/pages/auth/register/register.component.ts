import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/auth/auth.service';
import { RegisterModel } from '../../../@core/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerMessage = '';
  user: RegisterModel = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName:'',
    lastName:'',
    role:''

  };
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          null,
          Validators.compose([Validators.required, Validators.pattern(/^[a-z]+$/i), Validators.minLength(5)]),
        ],
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:_!-#$%^&*+-\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ]),
        ],
        password: [null, [Validators.compose([Validators.required, Validators.minLength(8)])]],
        confirmPassword: [null, [Validators.compose([Validators.required, Validators.minLength(8)])]],
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit() {}

  async register() {
    this.registerMessage = '';
    this.user = this.registerForm.value;
    try {
      const data = await this.authService.registerUser(this.user).toPromise();
      console.log({ data });
      if (data.success) {
        this.route.navigate(['/register-success'], {
          queryParams: { email: this.user.email },
        });
      } else {
        this.registerMessage = data.message;
      }
    } catch (error) {
      this.registerMessage = error?.error?.message;
      console.log({ error });
    }
  }

  googleAuth() {
    window.location.href = `${environment.backend}/auth/google`;
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  validatePassword(password) {
    // 0 : weak
    // 1 : medium
    // 0 : strong
    // Create an array and push all possible values that you want in password
    var matchedCase = new Array();
    matchedCase.push('[$@$!%*#?&]'); // Special Character
    matchedCase.push('[A-Z]'); // Uppercase Alphabet
    matchedCase.push('[0-9]'); // Numbers
    matchedCase.push('[a-z]'); // Lowercase Alphabet

    // Check the conditions
    var ctr = 0;
    for (var i = 0; i < matchedCase.length; i++) {
      if (new RegExp(matchedCase[i]).test(password)) {
        ctr++;
      }
    }
    let result = 0;
    switch (ctr) {
      case 0:
      case 1:
      case 2:
        result = 0;
        break;
      case 3:
        result = 1;
        break;
      case 4:
        result = 2;
        break;
    }
    return result;
  }
}
