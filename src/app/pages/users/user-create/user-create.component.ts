import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { INgxSelectOption } from 'ngx-select-ex';
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
  currentRole = 0;
  currentFormation =0;
  errorMessageUser = "";
  successMessageUser = "";
  public items: string[] = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
    'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

  public ngxValue: any = [];
  public ngxDisabled = false;

  public doSelectOptions = (options: INgxSelectOption[]) => console.log('MultipleDemoComponent.doSelectOptions', options);
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
        dateBirth: ["", Validators.required],
        salaire: [""],
        yearsExperience: [""],
        adress: [""],
        phoneNumber: [""],
       
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
  ngOnInit() { }

  onChange(value) {
    this.currentRole = value;
  }

  onChangeFormation(value) {
    this.currentFormation = value;
  }
  async createUser() {
    if (this.userForm.status !== 'VALID') {
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
    let formation: any;
    if (this.currentRole == 1) {
      role = "EMPLOYEE";
    }
    if (this.currentRole == 2) {
      role = "RH";
    }
    if (this.currentRole == 3) {
      role = "PROVIDER";
    }
    if (this.currentRole == 4) {
      role = "OPERATIONAL";
    }
    if (this.currentRole == 5) {
      role = "COMMERCIAL";
    }

    if (this.currentFormation == 1) {
      role = "BAC";
    }
    if (this.currentFormation == 2) {
      role = "BAC+1";
    }
    if (this.currentFormation == 3) {
      role = "BAC+2";
    }
    if (this.currentFormation == 4) {
      role = "BAC+3";
    }
    if (this.currentFormation == 5) {
      role = "BAC+4";
    }
    if (this.currentFormation == 6) {
      role = "BAC+5";
    }
    if (this.currentFormation == 7) {
      role = "DOCTORANT";
    }
    if (this.currentFormation ==8 ) {
      role = "PLUS";
    }

    
    const d = new Date(this.userForm.get("dateBirth").value);
    if (d.getTime() > new Date().getTime()) {
      this.errorMessageUser = "Date Invalide";
      return false;
    }
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    this.user = {
      email: this.userForm.get("email").value,
      firstName: this.userForm.get("firstName").value,
      lastName: this.userForm.get("lastName").value,
      salaire: this.userForm.get("salaire").value,
      dateBirth: date,
      yearsExperience:this.userForm.get("yearsExperience").value,
      phoneNumber: this.userForm.get("phoneNumber").value,
      adress: this.userForm.get("adress").value,
      formation,
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

  get salaire() {
    return this.userForm.get("salaire");
  }

  get yearsExperience() {
    return this.userForm.get("yearsExperience");
  }

  get adress() {
    return this.userForm.get("adress");
  }

  get formation() {
    return this.userForm.get("adress");
  }
  get phoneNumber() {
    return this.userForm.get("phoneNumber");
  }
  get dateBirth() {
    return this.userForm.get("dateBirth");
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
