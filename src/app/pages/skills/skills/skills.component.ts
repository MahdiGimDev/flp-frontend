import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SkillsCreateModel } from "../../../@core/models/auth.model";
import { SkillsService } from "../../../@core/services/skills.service";

@Component({
  selector: "ngx-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
})
export class SkillsCreateComponent {
  skills: SkillsCreateModel = {
    id: 0,
    label: "",
    description: "",
  };

  skillsForm: FormGroup;
  errorMessageSkills = "";
  successMessageSkills = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private skillsService: SkillsService,
    private fb: FormBuilder
  ) {
    this.createFormSkills();
  }

  ngOnInit(): void {}

  createFormSkills() {
    this.skillsForm = this.fb.group({
      label: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  async createSkills() {
    if (this.skills.label !== "") {
      this.errorMessageSkills = "valid form";
      return false;
    }
    this.errorMessageSkills = "";
    this.successMessageSkills = "";
    this.skills = {
      label: this.skillsForm.get("label").value,
      description: this.skillsForm.get("description").value,
    };
    try {
      const data: any = await this.skillsService
        .createSkills(this.skills)
        .toPromise();
        if (window.confirm('Competence ajoutée avec succés'))

      if (data.id) {
        this.router.navigate(["/pages/skills/all"]);
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
    console.log({ skills: this.skills });
  }

  get label() {
    return this.skillsForm.get("label");
  }
  get description() {
    return this.skillsForm.get("description");
  }
}
