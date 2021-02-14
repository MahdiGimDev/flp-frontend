import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  MissionCreateModel,
} from "../../../@core/models/auth.model";
import { MissionsService } from "../../../@core/services/missions.service";

@Component({
  selector: "ngx-mission-view",
  templateUrl: "./mission-offer-view.component.html",
  styleUrls: ["./mission-offer-view.component.scss"],
})
export class MissionOfferViewComponent implements OnInit {
  errorLogin = "";
  errorMessageJob = "";
  successMessageJob = "";
  mission: MissionCreateModel = {
    id: 0,
    address: "",
    description: "",
    period: 0,
    title: "",
    status: "",
    planfile: "",
    bonfile: "",
    purchase: "",
    invoice: "",
    visa: "",
    logement: "",
    categorie: "",
    transport: "",
    devise: "",
    technologies: "",
    type: "",
    startDate: "",
    endDate: "",
    level: "",
    skills: [],
    skillsIds: [],
    suggestion: [],
  };
  constructor(
    private route: ActivatedRoute,
    private missionService: MissionsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadMission(id);
    });
  }
  async loadMission(id) {
    let data: any = [];
    try {
      data = await this.missionService.getMissionById(id).toPromise();
      this.mission = data;
    } catch (error) {
      console.log({ error });
    }
  }
}
