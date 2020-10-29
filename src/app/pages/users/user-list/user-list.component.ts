import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { NgxSpinnerService } from "ngx-spinner";
import { UserModel } from "../../../@core/models/entity.model";
import { UsersService } from "../../../@core/services/users.service";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  role = "all";
  roles = ["provider", "rh", "admin", "employee","operationel","commercial"];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: "ID",
        type: "number",
      },
      firstName: {
        title: "First Name",
        type: "string",
      },
      lastName: {
        title: "Last Name",
        type: "string",
      },
      username: {
        title: "Competences",
        type: "string",
      },
      email: {
        title: "E-mail",
        type: "string",
      },
      role: {
        title: "Role",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "ADMIN", title: "Admin" },
              { value: "EMPLOYEE", title: "Employee" },
              { value: "RH", title: "RH" },
              { value: "PROVIDER", title: "Provider" },
              { value: "OPERATIONEL", title: "Operationel" },
              { value: "COMMERCIAL", title: "Commercial" },
            ],
          },
        },
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const role = `${params.role}`.toLowerCase();
      this.role = this.roles.includes(role) ? role : "all";
      console.log({ role });
      this.loadUsers();
    });
    this.loadUsers();
  }

  async loadUsers() {
    let data: any = [];
    this.source.load(data);
    this.spinner.show();
    try {
      if (this.role == "all") {
        data = await this.userService.getAllUsers().toPromise();
        this.source.load(data);
      } else {
        data = await this.userService.getUsersByRole(this.role).toPromise();
        this.source.load(data);
      }
    } catch (error) {
      console.log({ error });
    }
    this.spinner.hide();
  }

  async onDeleteConfirm(event) {
    const user: UserModel = event.data;
    console.log({ user });
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await this.userService.deleteUser(user.id).toPromise();
        event.confirm.resolve();
      } catch (error) {
        console.log({ error });
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event) {
    const user: UserModel = event.data;
    console.log({ user });
    if (window.confirm("Are you sure you want to Edit?")) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
