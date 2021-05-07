import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Defi } from './ChamoiDefinition';


@Injectable({
  providedIn: 'root'
})
export class DefisService {

  constructor(private requete:HttpClient) { }

  fetchDefis(): Observable<Defi[]>{
    return this.requete.get<Defi[]>('http://localhost:5000/api/defis/');
  }

  addNewdefi(defi:string,titre:string,dateDecreation:string,auteur:string,type:string,dateDemodification:string,
    arrets:string,distanciel:string,point:string,duree:string,indice:string,evalution:string,epilogue:string,
   description:string,motCles:string): Observable<Defi>{
    let newDefi :Defi={
      id: defi,
      titre: titre,
      dateDeCreation: dateDecreation,
      auteur:auteur,
      description: description,
      type: type,
      dateDeModification: dateDemodification,
      arret: arrets,
      distanciel: distanciel,
      motCles: motCles,
      points: point,
      duree: duree,
      indices: indice,
      evaluation: evalution,
      epilogue: epilogue,
      latitude: 0,
      longitude: 0
    }
    return this.requete.post<Defi>('http://localhost:5000/api/defis/${newDefi.id}', newDefi);

  }




}
