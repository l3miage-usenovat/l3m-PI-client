
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
  points: string;
  duree: string;
  indices: string;
  evaluation: string;
  epilogue: string;
  latitude: number;
  longitude: number;

}

export interface Arret{
    nom: string;
    code: string;
    streetmap : string;
    googlemap: string;
    ville : string;
    latitude: string;
    longitude : string;
    iddefis : string;

}
export interface Chami {

    email: string ;
    pseudo: string;
    age : string;
    ville: string;
    description: string
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
  geometry:TAGGeometry;
}

export interface TAGGeometry {
  type: string;
  coordinates: [lat:number,ln:number];

}


export function initialisationChami(): Chami{
  let chamiInit : Chami ={
    email:"",
    pseudo:"",
    age:"",
    ville:"",
    description:""
  }
  return chamiInit;
}

export function initialisationArret():Arret{
  let arretInit: Arret ={
    nom:"",
    code:"",
    streetmap:"",
    googlemap:"",
    ville:"",
    latitude:"",
    longitude:"",
    iddefis:""

  }
  return arretInit;
}

export interface ChamiLogged{
  uid:string ;
  email:string | null;
  displayName: string | null;
  photoURL:string | null;
  emailVerified:boolean;


}

/*
export function initialisationArretTag():any{
  let arretInit: TAGARRETProperties ={
    CODE: "",
  LIBELLE: "",
  type: "",
  COMMUNE:"",
  arr_visible:"",
  id: "",
  epci: "",
//  geometry.type:"",

  }
  return arretInit;
}
*/
