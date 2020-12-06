import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";
import { skillsModel } from "../../../@core/models/auth.model";

@Component({
  selector: "ngx-skill-preview",
  templateUrl: "./skill-preview.component.html",
  styleUrls: ["./skill-preview.component.scss"],
})
export class SkillPreviewComponent implements ViewCell, OnInit {
  renderValue: Array<skillsModel>;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value;
  }
}
