import { Proposition } from "./proposition";

export class Question {
    id_question : number;
    type_question : string;
    nb_propositions : number;
    text_question: string;
    propositions : Proposition[];
}
