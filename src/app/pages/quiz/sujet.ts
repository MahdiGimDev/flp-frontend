import { Questionnaire } from "./questionnaire";

export class Sujet {
    id_sujet: number;
    libelle: string;
    questionnaires: Questionnaire[];
}
