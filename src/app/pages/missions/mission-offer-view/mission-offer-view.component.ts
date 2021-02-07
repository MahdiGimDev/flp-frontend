import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionCreateModel } from 'app/@core/models/auth.model';
import { MissionsService } from 'app/@core/services/missions.service';

@Component({
  selector: 'ngx-mission-offer-view',
  templateUrl: './mission-offer-view.component.html',
  styleUrls: ['./mission-offer-view.component.scss']
})
export class MissionOfferViewComponent implements OnInit {
  errorLogin = "";
  mission: MissionCreateModel;
  errorMessageJob = "";
  successMessageJob = "";
  constructor(private route: ActivatedRoute, private jobService: MissionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadMission(id);
  });
}
async loadMission(id) {
  let data: any = [];
  try {
    data = await this.jobService.getMissionById(id).toPromise();
    this.mission = data;
  } catch (error) {
    console.log({ error });
  }
}
}
