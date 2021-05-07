import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Chamis{
  pseudo: string;
  age: number;
  ville: string;
  description:string;
}
export interface Defis{
  id: string;
  titre: string;
  dateDeCreation: Date;
  auteur: string;
  description: string;
  type: string;
  dateDeModification: Date;
  arret: string;
  distanciel: string;
  motcles: string;
  points: number;
  duree: string;
  indices: string;
  evaluation: string;
  epilogue: string;
  latitude: number;
  longitude: number;
}
export interface Description{
  num: number;
	id: string;
	nom: string;
	labele: string;
	descriptions: string;
	points: number;
	encouragement: string;
  clicked: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class GrehamisService {

  readonly ROOT_URL = 'http://localhost:5000/api';

  constructor(private httpService: HttpClient) { }

  getDefis(): Observable<Defis[]> {
    return this.httpService.get<Defis[]>(this.ROOT_URL + '/defis/')
  }

  getChamis(): Observable<Chamis[]> {
    return this.httpService.get<Chamis[]>(this.ROOT_URL + '/users/')
  }

  getDescriptions(): Observable<Description[]>{
    return this.httpService.get<Description[]>(this.ROOT_URL + '/descriptions/')
  }
}
