import { FeatureGroupDirective, PolylineDirective } from '@yaga/leaflet-ng2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FeatureCollection, MultiLineString} from "geojson";
import { TAGARRETProperties, TAGGeometry, TAGProperties } from './ChamoiDefinition';



@Injectable({
  providedIn: 'root'
})
export class GestionLignesArretsService {

  constructor(private requete:HttpClient) { }

  getLignes(): Observable<FeatureCollection<MultiLineString, TAGProperties>> {
      return this.requete.get<FeatureCollection<MultiLineString, TAGProperties>>("https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM");
    }


  getArrets():Observable<FeatureCollection<MultiLineString, TAGARRETProperties>> {
    return this.requete.get<FeatureCollection<MultiLineString, TAGARRETProperties>>("https://data.mobilites-m.fr/api/findType/json?types=arret");
  }

}
