
///////////gf/g///////////////
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { element } from 'protractor';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FeatureGroupDirective, OSM_TILE_LAYER_URL, PolylineDirective } from '@yaga/leaflet-ng2';
import firebase from 'firebase/app';
import { HttpErrorResponse } from '@angular/common/http';
import {FeatureCollection, MultiLineString} from "geojson";
import { CONNREFUSED } from 'node:dns';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Arret, Chami, ChamiLogged, Defi, initialisationArret, initialisationChami, TAGARRETProperties, TAGProperties } from '../ChamoiDefinition';
import { UsersService } from '../users.service';
import { DefisService } from '../defis.service';
import { GestionLignesArretsService } from '../gestion-lignes-arrets.service';
import { ArretsService } from '../arrets.service';
import { CreationDefiComponent } from './creation-defi/creation-defi.component';


@Component({
  selector: 'app-cartographe',
  templateUrl: './cartographe.component.html',
  styleUrls: ['./cartographe.component.scss']
})
export class CartographeComponent implements OnInit {

  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  public donnees : FeatureCollection<MultiLineString, TAGProperties> ={
    type:"FeatureCollection",
    features: []

  }
  public donneesArret! : FeatureCollection<MultiLineString, TAGARRETProperties>;

  users! : Observable<Chami[]>;
  defis! : Observable<Defi[]>;
  arrets!: Observable<Arret[]>;
  @Input() utilisateurName! : string;
  @Input() utilisateurAge! : string;
  @Input() nbDefi! : number;

  filtreSubj = new BehaviorSubject<string>('')

  defistab! : Defi [];
  defisChamiCourantTab ! :Defi[];
  chamistab! :Chami [];
  isChamis : boolean = false;
  chamiVide :Chami;
  arretVide :  Arret;
  chamisNew !: Observable<Chami>;
  arretNew! : Observable<Arret>;
  chamisLogged! :ChamiLogged;
  chamisCourant : Chami= {
    email:"",
    pseudo:"",
    age:"",
    ville:"",
    description:""

  };

  estUnchami :boolean = false;
  statusProfil :boolean = false;
  estEditable : boolean = false;
  statusAfficheDefis : boolean = false;
  editerArret : boolean = false;

   constructor(public auth: AngularFireAuth, private serviceUser:UsersService, private serviceDefi:DefisService, private serviceLigneArret: GestionLignesArretsService, private serviceArret: ArretsService, private dialogue:MatDialog) {
   this.chamiVide =initialisationChami();
   this.arretVide = initialisationArret()
   }
  ngOnInit(){
    this.getDefi();
    this.getLines();
    this.getArrets();
    this.getChami();

  }
  editionAret():void{
    this.editerArret = true;
  }

  desactiverEdtionArret():void{
    this.editerArret = false;
  }
  activerInfoProfil():void{
    this.statusProfil = true;
  }


  activerEdition():void{
    this.estEditable = true;
  }
   desactiverEdition():void{
     this.estEditable = false;
   }



  desactiverInfoProfil():void{
    this.statusProfil = false;
  }

  masquerMesDefis():void{
    this.statusAfficheDefis = false;
  }

  trouverDefisChamisCourant(auteur:string):void{
    let i :number;
    for(i=0;i<this.defistab.length;i++){
      if(this.defistab[i].auteur === auteur){
        this.defisChamiCourantTab.push(this.defistab[i]);
      }
    }
    this.statusAfficheDefis = true;
  }

  recuperUserCourant(info:any):void{
    this.chamisLogged = info;
    this.getChamiCourant(this.chamisLogged.email);
  }

  getChamiCourant(email:string|null):void{
    let i:number = 0
    for(i=0; i<this.chamistab.length; i++){
      if(this.chamistab[i].email === email){
        this.chamisCourant = this.chamistab[i];
        this.estUnchami = true;
      }

    }
    console.log(this.chamisCourant.pseudo);

  }


  ajout(){
    this.dialogue.open(CreationDefiComponent);

  }

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




    convertToString(color: any) {
      return color.split(',').map((component: string) => parseInt(component))
      .map((component: { toString: (arg0: number) => any; }) => component.toString(16))
      .map((component: string) => component.padStart(2, '0'))
      .join('')
      .padStart(7, '#');

  }

  recupererChami(utilisateur:any): void{
    this.isChamis === true;
    this.chamiVide.pseudo = utilisateur.pseudo;
    this.chamiVide.age = utilisateur.age;
    this.chamiVide.email = utilisateur.email;
    this.chamiVide.description = utilisateur.description;
    this.chamiVide.ville = utilisateur.ville;
  }

  // fonction d'insccription d'un nouveau chamis
  inscrireChamis(email:string, login:string, age:string, ville:string, description:string): void{
   this.chamisNew = this.serviceUser.addNewUser(email,login,age,ville,description);
   this.estUnchami = true;
   ///this.login();  ///////////// à revenir
  }

  miseAjourInfo(email:string, login:string, age:string, ville:string, description:string):void{
    this.chamisNew = this.serviceUser.updateChamis(email,login,age,ville,description);
    this.desactiverEdition();
  }

  recupererArret(arret:Arret): void{
    this.arretVide.nom = arret.nom;
    this.arretVide.code = arret.code;
    this.arretVide.streetmap = arret.streetmap;
    this.arretVide.googlemap = arret.googlemap;
    this.arretVide.ville = arret.ville;
    this.arretVide.latitude = arret.latitude;
    this.arretVide.longitude = arret.longitude;
    this.arretVide.iddefis = arret.iddefis;
  }
  creerArret(nom:string,code:string,streetmap:string,googlemap:string,ville:string,latitude:string,longitude:string,iddefis:string): void{
    this.arretNew = this.serviceArret.addNewArret(nom,code,streetmap,googlemap,ville,latitude,longitude,iddefis);
    this.desactiverEdtionArret();
  }

  miseAjourArret(nom:string,code:string,streetmap:string,googlemap:string,ville:string,latitude:string,longitude:string,iddefis:string): void{
    this.arretNew = this.serviceArret.updateArret(nom,code,streetmap,googlemap,ville,latitude,longitude,iddefis);
    this.desactiverEdtionArret();
  }

  recupererArretTag(arret:any): void{
    this.arretVide.nom = arret.nom;
    this.arretVide.code = arret.code;
    this.arretVide.streetmap = arret.streetmap;
    this.arretVide.googlemap = arret.googlemap;
    this.arretVide.ville = arret.ville;
    this.arretVide.latitude = arret.latitude;
    this.arretVide.longitude = arret.longitude;
    this.arretVide.iddefis = arret.iddefis;
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

  getChami(){
    this.serviceUser.fetchUsers().subscribe(
      (response: Chami [])=>{
        this.chamistab = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  getLines(){
    this.serviceLigneArret.getLignes().subscribe(
      (response)=>{
       this.donnees = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  getArrets(){
    this.serviceLigneArret.getArrets().subscribe(
      (response)=>{
       this.donneesArret = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }


  obsArretCrees(){
    this.arrets = this.serviceArret.getArretCrees();

  }

}

