import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCreateModel, skillsModel } from 'app/@core/models/auth.model';
import { UserModel } from 'app/@core/models/entity.model';
import { JobService } from 'app/@core/services/job.service';
import { SkillsService } from 'app/@core/services/skills.service';
import { UsersService } from 'app/@core/services/users.service';
import { LocalDataSource } from 'ng2-smart-table';
import { INgxSelectOption } from 'ngx-select-ex';

@Component({
  selector: 'ngx-jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.scss']
})
export class JobsDetailComponent implements OnInit {

  
  
  
  
  
  
  skills: Array<skillsModel> = [];


  userSource: LocalDataSource = new LocalDataSource();
 
  job: JobCreateModel = {
    id: 0,
    title: "",
    poste: "",
    profil: "",
    specialite: "",
    formation: "",
    addresse: "",
    description: "",
    contrat: "",
    startDate: "",
    level: "",
    status: "",   
    skills: [],
    skillsIds: [],
  };
  currentLevel = 1;
 
  errorMessageJob = "";
  successMessageJob = "";
  selectedSkills = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private userService: UsersService,
    private skillsService: SkillsService,
    private fb: FormBuilder
  ) {}
  public doSelectOptions = (options: INgxSelectOption[]) => {
    this.selectedSkills = [];
    options.map((option) => {
      this.selectedSkills.push(option.data?.id);
    });
  };
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadJob(id);
    
    });
    this.loadSkills();
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
  onChangeLevel(value) {
    this.currentLevel = value;
  }
  async loadJob(id) {
    let data: any = [];
    try {
      data = await this.jobService.getJobById(id).toPromise();
      console.log({ data });
      this.job = data;
    } catch (error) {
      console.log({ error });
    }
  }


}