import { element } from 'protractor';
import { DefisService } from './defis.service';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import firebase from 'firebase/app';
import { Chami, Defi } from './ChamisDefiDefinition';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent  implements OnInit{
  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  /*MON CODE SUIVI DE ONENOTE*/

  //user:Observable<User> | undefined;
  title: any;

  users! : Observable<Chami[]>;
  defis! : Observable<Defi[]>;
  @Input() utilisateurName! : string;
  @Input() utilisateurAge! : string;
  @Input() nbDefi! : number;
  defistab : Defi [] = [];


  constructor(public auth: AngularFireAuth, private serviceUser:UsersService, private serviceDefi:DefisService) {  }
  ngOnInit(){
    this.getDefi();

  }

    login(): void {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      this.auth.signInWithPopup(provider);
    }

    logout(): void {
      this.auth.signOut();
    }

  get obs(){
    return this.auth.user;
  }

   obsUser(){
    this.users= this.serviceUser.fetchUsers();
  }


   obsDefi(){
     this.defis = this.serviceDefi.fetchDefis();
  }

  getDefi(){
    this.serviceDefi.fetchDefis().subscribe(
      (response: Defi[])=>{
        this.defistab = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }




    /*tableChamis(): void {
      fetch('http://chamis.herokuapp.com')
        .then(res => res.json)
        .then (data => console.log(data))
    }*/

    trouveNbDEFI(nom: string): number{
      let nombre : number = 0;
      let i: number = 0;
      for(i= 0 ; i< this.defistab.length; i++){
        if( this.defistab[i].auteur=== nom){
          nombre ++;
        }

      }
      return nombre;
    }

    CreateNewUser(){
     const person = {
        "pseudo":"Tieux",
        "age": 18
      }
      console.log('je suis la')
      return this.serviceUser.addNewUser(person);


    }

    geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

couleur = "green";

}


