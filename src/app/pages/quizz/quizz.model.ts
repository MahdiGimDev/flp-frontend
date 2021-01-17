import { skillsModel } from "../../@core/models/auth.model";
import { BaseEntityModel } from "../../@core/models/entity.model";

export interface QuizModel extends BaseEntityModel {
  title: string;
  type: string;
  level: string;
  questions?: Array<QuizQuestionModel>;
  skills?: Array<skillsModel>;
  skillIds?: Array<number>;
}

export interface QuizQuestionModel extends BaseEntityModel {
  duration: number;
  score: number;
  text: string;
  propositions: Array<QuizPropositionModel>;
}

export interface QuizSessionModel extends BaseEntityModel {
  email: string;
  name: string;
  phone: string;
  quiz?: QuizModel;
  responses?: Array<QuizResponseModel>;
}

export interface QuizPropositionModel extends BaseEntityModel {
  text: string;
  valid: boolean;
}

export interface QuizResponseModel extends BaseEntityModel {
  question: string;
  answers: string;
  score: number;
  result: number;
  questionId: number;
  duration: number;
}

export const QuizDataTableSettings = {
  actions: {
    add: false,
    edit: false,
  },
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
    title: {
      title: "Titre",
      type: "string",
    },
    level: {
      title: "Level",
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
            .join(", ");
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
    total: {
      title: "Questions",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        let length = 0;
        const resp: Array<QuizQuestionModel> = row.questions;
        if (resp) {
          length = resp.length;
        }
        return length;
      },
    },
  },
};

export const QuizSessionDataTableSettings = {
  actions: {
    add: false,
    edit: false,
  },
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
    name: {
      title: "Name",
      type: "string",
    },
    email: {
      title: "Email",
      type: "string",
    },
    phone: {
      title: "Mobile",
      type: "string",
    },
    total: {
      title: "Questions",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        let length = 0;
        const resp: Array<QuizResponseModel> = row.responses;
        if (resp) {
          length = resp.length;
        }
        return length;
      },
    },
    valid: {
      title: "Valid",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        let score = 0;
        const resp: Array<QuizResponseModel> = row.responses;
        if (resp) {
          score = resp.filter((item) => item.result > 0).length;
        }
        return score;
      },
    },
    score: {
      title: "Score",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        let score = 0;
        const resp: Array<QuizResponseModel> = row.responses;
        if (resp) {
          score = resp.reduce((sum, value) => sum + value.score, 0);
        }
        return score;
      },
    },
    responses: {
      title: "Result",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        let score = 0;
        let total = 0;
        const resp: Array<QuizResponseModel> = row.responses;
        if (resp) {
          score = resp.reduce((sum, value) => sum + value.result, 0);
          total = resp.reduce((sum, value) => sum + value.score, 0);
        }
        return `${total > 0 ? ((score / total) * 100).toFixed(1) : 0}%`;
      },
      filterFunction: (data?: any, search?: any): boolean => {
        let result = false;
        let score = 0;
        let total = 0;
        const resp: Array<QuizResponseModel> = data;
        if (resp) {
          score = resp.reduce((sum, value) => sum + value.result, 0);
          total = resp.reduce((sum, value) => sum + value.score, 0);
        }
        const totalCh = total > 0 ? ((score / total) * 100).toFixed(1) : "0";
        if (totalCh.toLowerCase().includes(search.toLowerCase())) {
          result = true;
        }
        return result;
      },
    },
    createdAt: {
      title: "Created",
      type: "string",
      valuePrepareFunction: (cell: any, row: any) => {
        const date = new Date(row.createdAt);
        return date.toUTCString();
      },
    },
  },
};
