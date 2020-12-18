import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CertifsService } from 'app/@core/services/certifs.service';
import { CertifsCreateModel } from "../../../@core/models/auth.model";


@Component({
  selector: 'ngx-certif-create',
  templateUrl: './certif-create.component.html',
  styleUrls: ['./certif-create.component.scss']
})
export class CertifsCreateComponent  {
  certifs: CertifsCreateModel = {
    id: 0,
    label: "",
    description: "",
  };

  certifsForm: FormGroup;
  errorMessageSkills = "";
  successMessageSkills = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certifsService: CertifsService,
    private fb: FormBuilder
  ) {
    this.createFormCertifs();
  }

  ngOnInit(): void {}

  createFormCertifs() {
    this.certifsForm = this.fb.group({
      label: ["", Validators.required],
      description: [""],
    });
  }

  async createCertifs() {
    if (this.certifs.label !== "") {
      this.errorMessageSkills = "valid form";
      return false;
    }
    this.errorMessageSkills = "";
    this.successMessageSkills = "";
    this.certifs = {
      label: this.certifsForm.get("label").value,
      description: this.certifsForm.get("description").value,
    };
    try {
      const data: any = await this.certifsService
        .createCertifs(this.certifs)
        .toPromise();
      if (data.id) {
        this.router.navigate(["/pages/certifs/all"]);
        this.successMessageSkills = "Created successfully";
      } else {
        this.errorMessageSkills = data?.message?.message;
      }
    } catch (error) {
      if (error.error) {
        this.errorMessageSkills = error.error.message;
      } else {
        this.errorMessageSkills = "Error on creating";
      }
    }
    console.log({ certifs: this.certifs});
  }

  get label() {
    return this.certifsForm.get("label");
  }
  get description() {
    return this.certifsForm.get("description");
  }
}
