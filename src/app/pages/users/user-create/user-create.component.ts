import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../@core/auth/auth.service";
import { RegisterModel } from "../../../@core/models/auth.model";
import { UserModel } from "../../../@core/models/entity.model";
import { MustMatch } from "../../../@core/services/helpers";
import { UsersService } from "../../../@core/services/users.service";

@Component({
  selector: "ngx-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent implements OnInit {
  user: RegisterModel;
  userForm: FormGroup;
  currentRole = 1;
  errorMessageUser = "";
  successMessageUser = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.createForm();
  }
  createForm() {
    this.userForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
          ]),
        ],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }
  ngOnInit() {}

  onChange(value) {
    this.currentRole = value;
  }

  async createUser() {
    if (!this.userForm.valid) {
      this.errorMessageUser = "Invalid form";
      return false;
    }
    if (this.currentRole === 0) {
      this.errorMessageUser = "Invalid role";
      return false;
    }
    this.errorMessageUser = "";
    this.successMessageUser = "";
    let role: any;
    if (this.currentRole == 1) {
      role = "EMPLOYEE";
    }
    if (this.currentRole == 2) {
      role = "RH";
    }
    if (this.currentRole == 3) {
      role = "PROVIDER";
    }
    this.user = {
      email: this.userForm.get("email").value,
      firstName: this.userForm.get("firstName").value,
      lastName: this.userForm.get("lastName").value,
      role,
      password: this.userForm.get("password").value,
      confirmPassword: this.userForm.get("confirmPassword").value,
      username: this.userForm.get("firstName").value,
    };
    this.authService.registerUser(this.user).subscribe(
      (data) => {
        if (data.success) {
          this.router.navigate(["/pages/users/all"]);
          this.successMessageUser = "Created successfully";
        } else {
          this.errorMessageUser = data?.message?.message;
        }
      },
      (err) => {
        this.errorMessageUser = "Error on creating";
      }
    );
    console.log({ user: this.user });
  }

  get email() {
    return this.userForm.get("email");
  }
  get firstName() {
    return this.userForm.get("firstName");
  }
  get lastName() {
    return this.userForm.get("lastName");
  }
  get password() {
    return this.userForm.get("password");
  }
  get confirmPassword() {
    return this.userForm.get("confirmPassword");
  }
}
