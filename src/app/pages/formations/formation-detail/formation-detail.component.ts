import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { AuthService } from 'app/@core/auth/auth.service';
import { certifsModel, JwtPayload, skillsModel } from 'app/@core/models/auth.model';
import { CertifsService } from 'app/@core/services/certifs.service';
import { FormationService } from 'app/@core/services/formation.service';
import { SkillsService } from 'app/@core/services/skills.service';
import { UserProfileComponent } from 'app/shared/components/user-profile/user-profile.component';
import { FormationModel, UserModel } from 'app/@core/models/entity.model';
@Component({
  selector: 'ngx-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.scss']
})
export class FormationDetailComponent implements OnInit {

  errorMessageMission = "";
  successMessageMission = "";
  errorLogin = "";
  skills: Array<skillsModel> = [];
  certifs: Array<certifsModel> = [];
  currentUser: JwtPayload;
  vacation: FormationModel = {
  id:0,
  title: "",
  speciality: "",
  categorie: "",
  description: "",
  startDate:  "",
  endDate:  "",
  status:  "",
  type:  "",
  post: "",
  type2: "",
  establishment: "",
  file:  "",
  period:  0,
  };
  constructor(
    private route: ActivatedRoute,
    private vacationService: FormationService,
    private router: Router,
    private dialogService: NbDialogService,
    private skillsService: SkillsService,
    private certifsService:CertifsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getTokenData();
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadFormation(id);
      if (this.currentUser.role == "RH" || this.currentUser.role == "ADMIN") {
        
        this.loadSkills();
        this.loadCertifs();
       

      }
    });
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


  async loadFormation(id) {
    let data: any = [];
    try {
      data = await this.vacationService.getVacation(id).toPromise();
      this.vacation = data;
    } catch (error) {
      console.log({ error });
    }
  }



  async viewProfile() {
    this.dialogService.open(UserProfileComponent, {
      context: {
        user: this.vacation.user,
        admin: true,
      },
    });
  }
  async onAccept() {
    let data: any = [];
    this.errorLogin = "";
    try {
      data = await this.vacationService
        .acceptVacation(this.vacation.id)
        .toPromise();
      await this.loadFormation(this.vacation.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";                                    
      }
      console.log({ error });   
    }
  }
  async onRefuse() {
    let data: any = [];
    this.errorLogin = "";
    try {
      data = await this.vacationService
        .refuseVacation(this.vacation.id)
        .toPromise();
      await this.loadFormation(this.vacation.id);
    } catch (error) {
      if (error.error) {
        this.errorLogin = error.error.message;
      } else {
        this.errorLogin = "Internal server";
      }
      console.log({ error });
    }
  }
  async onDeleteConfirm() {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.vacationService.deleteVacation(this.vacation.id).toPromise();
        this.router.navigate(["/pages/vacations/all"]);
      } catch (error) {
        console.log({ error });
      }
    } else {
    }
  }













}
