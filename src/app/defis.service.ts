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

  addDefis(defis : Defi): Observable<Defi>{
    return this.requete.post<Defi>(`http://localhost:5000/api/defis/${defis.id}`, defis);
  }
}
