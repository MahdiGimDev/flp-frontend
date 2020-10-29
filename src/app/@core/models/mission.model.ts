

export interface missionModel {


  id:number;
 
  titre : string;


  profil : string;

  
  type?: 'FORMATION' | 'AUDIT' | 'CONSULTING' | 'AUTRE';

 
  skills :  string;  

 
  technologies : string;

  
  niveauEx?: 'JUNIOR' | 'SENIOR' | 'EXPERT' ;


  
  dateDebut : string;

  
  durée : string;

  
  emplacement : string;

  

  description : string;

  
  statusMission:string;
}


