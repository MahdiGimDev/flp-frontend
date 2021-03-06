import { skillsModel } from "../models/auth.model";

export const UsersSettings = {
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
    
    
    file: {
      title: "Picture",
      type: "html",
      valuePrepareFunction: (file:string) => { return `<img width="50px" src="${file}" />`; },
    },
    firstName: {
      title: "First Name",
      type: "string",
    },
    lastName: {
      title: "Last Name",
      type: "string",
    },
  
    email: {
      title: "Email",
      type: "string",
    },
    
    skills: {
      title: "Skills",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        const limit = 3;
        let skills = "";
        if (row.skills) {
          skills = row.skills
            .slice(0, limit)
            .reduce((array, value) => [...array, value.label], [])
            .join(" ");
          const size = row.skills.length;
          skills += row.skills.length > limit ? ` + ${size - limit}` : "";
        }
        return skills;
      },
      filterFunction: (data?: any, search?: any): boolean => {
        let result = false;
        data.map((skill: skillsModel) => {
          if (skill.label.toLowerCase().includes(search.toLowerCase())) {
            result = true;
          }
        });
        return result;
      },
    },
    role: {
      title: "Role",
      type: "html",
      editor: {
        type: "list",
        email: {
          title: "E-mail",
          type: "string",
        },
        config: {
          list: [
            { value: "ADMIN", title: "Admin" },
            { value: "EMPLOYEE", title: "Employee" },
            { value: "RH", title: "RH" },
            { value: "PROVIDER", title: "Provider" },
            { value: "OPERATIONAL", title: "Operational" },
            { value: "COMMERCIAL", title: "Commercial" },
          ],
        },
      },
    },
  },
};
