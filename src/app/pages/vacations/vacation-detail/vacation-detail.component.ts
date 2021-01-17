import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { CertifsService } from 'app/@core/services/certifs.service';
import { SkillsService } from 'app/@core/services/skills.service';
import { AuthService } from "../../../@core/auth/auth.service";
import { certifsModel, JwtPayload, skillsModel } from "../../../@core/models/auth.model";
import { VacationModel } from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
import { VacationService } from "../../../@core/services/vacation.service";
import { UserProfileComponent } from "../../../shared/components/user-profile/user-profile.component";

@Component({
  selector: "ngx-vacation-detail",
  templateUrl: "./vacation-detail.component.html",
  styleUrls: ["./vacation-detail.component.scss"],
})
export class VacationDetailComponent implements OnInit {
  errorMessageMission = "";
  successMessageMission = "";
  errorLogin = "";
  skills: Array<skillsModel> = [];
  certifs: Array<certifsModel> = [];
  currentUser: JwtPayload;
  vacation: VacationModel = {
    id: 0,
    title: "",
    startDate: "",
    endDate: "",
    period: 0,
    file: "",
    status: "",
    type: "",
  };
  constructor(
    private route: ActivatedRoute,
    private vacationService: VacationService,
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
      await this.loadVacation(id);
      if (this.currentUser.role == "RH" || this.currentUser.role == "ADMIN"||this.currentUser.role == "OPERATIONAL") {
        
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

  async loadVacation(id) {
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
      await this.loadVacation(this.vacation.id);
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
      await this.loadVacation(this.vacation.id);
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
