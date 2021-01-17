import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JobCreateModel, JobModel } from "../../../@core/models/auth.model";
import { JobService } from "../../../@core/services/job.service";

@Component({
  selector: "ngx-job-offer-view",
  templateUrl: "./job-offer-view.component.html",
  styleUrls: ["./job-offer-view.component.scss"],
})
export class JobOfferViewComponent implements OnInit {
  errorLogin = "";
  job: JobCreateModel;
  errorMessageJob = "";
  successMessageJob = "";
  constructor(private route: ActivatedRoute, private jobService: JobService) {}
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params.id;
      await this.loadJob(id);
    });
  }
  async loadJob(id) {
    let data: any = [];
    try {
      data = await this.jobService.getJobById(id).toPromise();
      this.job = data;
    } catch (error) {
      console.log({ error });
    }
  }
}
