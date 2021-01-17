import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { missionModel } from 'app/@core/models/auth.model';
import { AdministrativeModel } from 'app/@core/models/entity.model';
import { MissionsService } from 'app/@core/services/missions.service';
import { AdministrativeService } from 'app/@core/services/administrative.service';

import { environment } from 'environments/environment';
import { AuthService } from 'app/@core/auth/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ngx-create-administrative',
  templateUrl: './create-administrative.component.html',
  styleUrls: ['./create-administrative.component.scss']
})
export class CreateAdministrativeComponent implements OnInit {

  constructor(

  ) {
    
  }

  ngOnInit(): void {
    
  }


 



}
