
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArretsService } from './arrets.service';
import { GestionLignesArretsService } from './gestion-lignes-arrets.service';
import { element } from 'protractor';
import { DefisService } from './defis.service';
import { UsersService } from './users.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FeatureGroupDirective, OSM_TILE_LAYER_URL, PolylineDirective } from '@yaga/leaflet-ng2';
import firebase from 'firebase/app';
import { Arret, Chami, Defi, initialisationArret, initialisationChami, TAGARRETProperties, TAGProperties, ChamiLogged } from './ChamoiDefinition';
import { HttpErrorResponse } from '@angular/common/http';
import {FeatureCollection, MultiLineString} from "geojson";
import { CONNREFUSED } from 'node:dns';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  // Le bon type :
  //   FeatureCOllection est un type générique standard dans geojson
  //   il est générique et paramétrable avec le type de géométrie et le tye de propriété :
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
  estInscrisMaintenant : boolean = true;


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

  inscrirePlustard():void{
    this.estInscrisMaintenant = false;
  }
  inscrireChamis(email:string, login:string, age:string, ville:string, description:string): void{
   this.chamisNew = this.serviceUser.addNewUser(email,login,age,ville,description);
   this.estInscrisMaintenant = false;
   this.isChamis = true;
   ///this.login();  ///////////// à revenir
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


<<<<<<< HEAD
  obsArretCrees(){
    this.arrets = this.serviceArret.getArretCrees();
=======


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
    // doit être
    CreateNewUser(){
     const person = {
        "pseudo":"Tieux",
        "age": 18,
        "description": " eh voila je sui un chaMis"
      }
      console.log('je suis la')
      return this.serviceUser.addNewUser(person);


    }



    convertToString(color: any) {
      return color.split(',').map((component: string) => parseInt(component))
      .map((component: { toString: (arg0: number) => any; }) => component.toString(16))
      .map((component: string) => component.padStart(2, '0'))
      .join('')
      .padStart(7, '#');
  }

<<<<<<< HEAD
  ajout(){
    this.dialogue.open(CreationDefisComponent);
  }
=======
  // fonction à implementer
  creationDefi(idDefi: string,titre:string,arret:string,motCle:string,description:string):void{
    let newDefi!:Defi;
    newDefi.id = idDefi;
    newDefi.titre = titre;
    newDefi.arret = arret;
    newDefi.motCles  = motCle;
    newDefi.description = description;
    // reflichir à l'initialisationn des autre données tel que la latitude
    // longitude nom auteur et date de creation date de modification
    // le formulaire servira en effet à modifier des defi existants prendre en compte ce paramètre
    // dans la mis en place de la fonction

>>>>>>> 2c58b86e500d7506046b294026e7cc8c5ce2a922

  }

>>>>>>> c1cec6c59e19d9a69268a5fb48b2d39cbf44e60b
}
