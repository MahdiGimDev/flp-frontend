import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Countries } from "app/@core/data/consts";
import { certifsModel, RegisterModel, skillsModel } from 'app/@core/models/auth.model';
import { CertifsService } from 'app/@core/services/certifs.service';
import { INgxSelectOption } from "ngx-select-ex";
import { AuthService } from "../../../@core/auth/auth.service";
import { UserModel } from "../../../@core/models/entity.model";
import { MustMatch } from "../../../@core/services/helpers";
import { SkillsService } from "../../../@core/services/skills.service";
import { UsersService } from "../../../@core/services/users.service";

@Component({
  selector: "ngx-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent implements OnInit {

//////image 
imageError: string;
    isImageSaved: boolean;
    cardImageBase64: string;










  user: RegisterModel;
  userForm: FormGroup;
  currentRole = 0;
  currentFormation = 1;
  currentGender = 1;
  currentProvider = 1;

  currentSituation =1;
  errorMessageUser = "";
  successMessageUser = "";
  selectedSkills = [];
  selectedCertifs = [];
  imageSrc : string;
  phones = Countries;
  public files: any;
  selectedFile: File;

  public ngxDisabled = false;
  skills: Array<skillsModel> = [];

  public ngxDisabled1 = false;
  certifs: Array<certifsModel> = [];

  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };


  public doSelectOptionsC = (options: INgxSelectOption[]) => {
    this.selectedCertifs = [];
    options.map((option) => {
      this.selectedCertifs.push(option.data?.id);
    });
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private skillsService: SkillsService,
    private certifsService: CertifsService,
 private http : HttpClient,
    private userService: UsersService
  ) {
    this.createForm();
  }
  async loadSkills() {
    let data: any = [];
    try {
      data = await this.skillsService.getAllSkills().toPromise();
      this.skills = data;
    } catch (error) {
      console.log({ error });
    }
  }


  async loadCertifs() {
    let data: any = [];
    try {
      data = await this.certifsService.getAllCertifs().toPromise();
      this.certifs = data;
    } catch (error) {
      console.log({ error });
    }
  }

  createForm() {
    this.userForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        dateBirth: ["", Validators.required],
        pays: ["", Validators.required],
        paysd: ["", Validators.required],
        ville: ["", Validators.required],
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required]),
        salaire: [0],
        maxvacation:[0],
        vacationmaladie:[0],
        maxmaladie:[0],
        tjme: [0],
        startDate: [""],
        tjmd: [0],   
        vacations:[0],
        yearsExperience: [0],
        adress: [""],
        phonenumber: ["", Validators.required],
        cv: [""],
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),

            // Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
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
  ngOnInit() {
    this.loadSkills();
    this.loadCertifs();
  }

  onChange(value) {
    this.currentRole = value;
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onChangeFormation(value) {
    this.currentFormation = value;
  }

  onChangeProvider(value) {
    this.currentProvider = value;
  }


  onChangeGender(value) {
    this.currentGender = value;
  }

  onChangeSituation(value) {
    this.currentSituation = value;
  }


  async createUser() {
    console.log({ userform: this.userForm });
    if (this.userForm.status !== "VALID") {
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
    let typep: any;

    let situation: any;
    let gender : any;
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

    if (this.currentRole == 6) {
      role = "CLIENT";
    }
    if (this.currentFormation == 1) {
      formation = "BAC";
    }
    if (this.currentGender == 0) {
      this.errorMessageUser = "veuillez choisir un sex";
      return false;
    }



    if (this.currentFormation == 1) {
      gender = "Homme";
    }

    if (this.currentFormation == 2) {
      gender = "Femme";
    }

    if (this.currentSituation == 0) {
      this.errorMessageUser = "veuillez choisir une situation";
      return false;
    }

 if (this.currentSituation== 1){
   situation = "CELIBATAIRE";
 }
 if (this.currentSituation== 2){
  situation = "MARIEE";
}
if (this.currentSituation== 3){
  situation = "DIVORCE";
}
if (this.currentSituation== 4){
  situation = "VEUF";
}
if (this.currentSituation== 5){
  situation = "AUTRE";
}
if (this.currentSituation== 6){
  situation = "VEUVE";
}
if (this.currentProvider == 0) {
  this.errorMessageUser = "veuillez choisir un type fournisseur";
  return false;
}

if (this.currentProvider == 1) {
  typep = "MORAL";
}

if (this.currentProvider == 2) {
  typep = "PHYSIQUE";
}


    if (this.currentFormation == 0) {
      this.errorMessageUser = "veuillez choisir un niveau de formation";
      return false;
    }

    if (this.currentFormation == 2) {
      formation = "BAC+2";
    }
    if (this.currentFormation == 3) {
      formation = "BAC+3";
    }
    if (this.currentFormation == 4) {
      formation = "BAC+4";
    }
    if (this.currentFormation == 5) {
      formation = "BAC+5";
    }
    if (this.currentFormation == 6) {
      formation = "DOCTORANT";
    }
    if (this.currentFormation == 7) {
      formation = "PLUS";
    }

    const d = new Date(this.userForm.get("dateBirth").value);
    const d1 = new Date(this.userForm.get("startDate").value);

    if (d.getTime() > new Date().getTime()||d1.getTime() > new Date().getTime() ) {
      this.errorMessageUser = "Date Invalide";
      return false;
    }
    const date = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear();
    const dated = d1.getMonth() + 1 + "-" + d1.getDate() + "-" + d1.getFullYear();

    this.user = {
      email: this.userForm.get("email").value,
      firstName: this.userForm.get("firstName").value,
      lastName: this.userForm.get("lastName").value,
      ville: this.userForm.get("ville").value,
      pays: this.userForm.get("pays").value,
      paysd: this.userForm.get("paysd").value,
      cv: this.userForm.value.cv,
      certif: this.userForm.value.cv,
      tjme: this.userForm.value.tjme,
      tjmd: this.userForm.value.tjmd,
      vacations : this.userForm.value.vacations,
      maxvacation : this.userForm.value.maxvacation,
      vacationmaladie : this.userForm.value.vacationmaladie,
      maxmaladie : this.userForm.value.maxmaladie,
      salaire: this.userForm.value.salaire,
      dateBirth: date,
      startDate: dated,
      skillsIds: this.selectedSkills,
      certifsIds: this.selectedCertifs,
      yearsExperience: this.userForm.value.yearsExperience,
      phonenumber: this.userForm.get("phonenumber").value,
      adress: this.userForm.get("adress").value,
      file: this.userForm.get("file").value,
      gender,
      formation,
      typep,
      situation,
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


////image file///
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.userForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }


  submit(){
    console.log(this.userForm.value);
    this.http.post('http://localhost:8001/upload.php', this.userForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }



   
  get f(){
    return this.userForm.controls;
  }




  get email() {
    return this.userForm.get("email");
  }
  get situation() {
    return this.userForm.get("situation");
  }


  get salaire() {
    return this.userForm.get("salaire");
  }
  get vacations(){
    return this.userForm.get("vacations");
  }

  get tjmd() {
    return this.userForm.get("tjmd");
  }

  get tjme() {
    return this.userForm.get("tjme");
  }

  get yearsExperience() {
    return this.userForm.get("yearsExperience");
  }

  get adress() {
    return this.userForm.get("adress");
  }
  get ville() {
    return this.userForm.get("ville");
  }

  get typep() {
    return this.userForm.get("typep");
  }
  
  
  get pays() {
    return this.userForm.get("pays");
  }

  get gender() {
    return this.userForm.get("gender");
  }

  get paysd() {
    return this.userForm.get("paysd");
  }


  get formation() {
    return this.userForm.get("formation");
  }
  get phonenumber() {
    return this.userForm.get("phonenumber");
  }
  get dateBirth() {
    return this.userForm.get("dateBirth");
  }

  get firstName() {
    return this.userForm.get("firstName");
  }

  get cv() {
    return this.userForm.get("cv");
  }

  get file() {
    return this.userForm.get("file");
  }

  get startDate() {
    return this.userForm.get("startDate");
  }


  get vacationmaladie() {
    return this.userForm.get("vacationmaladie");
  }

  get maxmaladie() {
    return this.userForm.get("maxmaladie");
  }

  get maxvacation() {
    return this.userForm.get("maxvacation");
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








//////////image fonction not work ///////////

fileChangeEvent(file: any) {
  this.imageError = null;
  if (file.target.files && file.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
     
      const max_height = 15200;
      const max_width = 25600;

      if (file.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';

          return false;
      }

      if (!file.target.files[0].type.includes(allowed_types)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              console.log(img_height, img_width);


              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
      };

      reader.readAsDataURL(file.target.files[0]);
  }
}

removeImage() {
  this.cardImageBase64 = null;
  this.isImageSaved = false;
}










}
