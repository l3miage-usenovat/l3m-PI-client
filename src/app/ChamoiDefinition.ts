import { GeoJSONDirective, PolylineDirective } from "@yaga/leaflet-ng2";

export interface Defi {
   id: string;
   titre: string;
   dateDeCreation: Date;
   auteur:string;
  description: string;
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
