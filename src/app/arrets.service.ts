
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arret } from './ChamoiDefinition';

@Injectable({
  providedIn: 'root'
})
export class ArretsService {

  ressourceArretsCrees:string = 'http://localhost:5000/api/arrets/';


  constructor(private requete: HttpClient) { }

  getArretCrees(): Observable<Arret[]>{
    return this.requete.get<Arret[]>(this.ressourceArretsCrees);
  }

  addNewArret(nom:string,code:string,streetmap:string,googlemap:string,ville:string,latitude:string,longitude:string,iddefis:string): Observable<Arret>{
    let newArret :Arret={
      nom: nom,
      code: code,
      streetmap:streetmap,
      googlemap:googlemap,
      ville:ville,
      latitude:latitude,
      longitude:longitude,
      iddefis:iddefis
    }
    console.log("JE lAI CREE")
    return this.requete.post<Arret>(this.ressourceArretsCrees+newArret.nom,newArret);

  }
  updateArret(nom:string,code:string,streetmap:string,googlemap:string,ville:string,latitude:string,longitude:string,iddefis:string): Observable<Arret>{
    let newArret :Arret={
      nom: nom,
      code: code,
      streetmap:streetmap,
      googlemap:googlemap,
      ville:ville,
      latitude:latitude,
      longitude:longitude,
      iddefis:iddefis
    }
    return this.requete.put<Arret>(this.ressourceArretsCrees+newArret.nom,newArret);

  }

}
