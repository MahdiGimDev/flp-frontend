export interface missionModel {
  id: number;

  titre: string;
  type?: "FORMATION" | "AUDIT" | "CONSULTING" | "AUTRE";

  technologies: string;

  niveauEx?: "JUNIOR" | "SENIOR" | "EXPERT";
  dateDebut: string;

  durée: string;

  period: number;

  emplacement: string;

  description: string;

  statusMission: string;
}
