import { Question } from "./question";
import { Sujet } from "./sujet";

export class Questionnaire {
    id_questionnaire : number;
    titre_questionnaire : string;
    niveau: string;
    nb_questions : number;
    dateCreation: string;
    dateUpdate: string;
    questions: Question[];
    sujet: Sujet;
}
