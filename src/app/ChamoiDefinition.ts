import { GeoJSONDirective, PolylineDirective } from "@yaga/leaflet-ng2";

export interface Defi {
   id: string;
   titre: string;
   dateDeCreation: string;
   auteur:string;
  description: string;
  type: string;
  dateDeModification: string;
  arret: string;
  distanciel: string;
  motCles: string;
  points: number;
  duree: string;
  indices: string;
  evaluation: string;
  epilogue: string;
  latitude: number;
  longitude: number;

}

export interface Chami {

    pseudo: string;
    age : number;
}

export interface TAGProperties {
  NUMERO:number;
  CODE:string;
  COULEUR:string;
  COULEUR_TEXTE:string;
  PMR:number;
  LIBELLE:string;
  ZONES_ARRET: string[];
}

export interface TAGARRETProperties {
  CODE: string;
  LIBELLE: string;
  type: string;
  COMMUNE: string;
  arr_visible:string;
  id: string;
  epci: string;
}

export interface TAGGeometry {
  type: string;
  coordinates: number [];

}
