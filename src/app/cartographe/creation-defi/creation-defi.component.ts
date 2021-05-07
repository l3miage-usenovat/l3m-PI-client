
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import {FeatureCollection, MultiLineString} from "geojson";

import{map,filter} from 'rxjs/operators'
import { Arret, Defi, TAGARRETProperties } from 'src/app/ChamoiDefinition';
import { DefisService } from 'src/app/defis.service';
import { GestionLignesArretsService } from 'src/app/gestion-lignes-arrets.service';

@Component({
  selector: 'app-creation-defis',
  templateUrl: './creation-defi.component.html',
  styleUrls: ['./creation-defi.component.scss']
})
export class CreationDefiComponent implements OnInit {

  arretNew! : Observable<Arret>;


  public donneesArret! : FeatureCollection<MultiLineString, TAGARRETProperties>;

  arretTAg! : Observable<FeatureCollection<MultiLineString, TAGARRETProperties>>;

  filtreSubj = new BehaviorSubject<string>('')
  defisRecherche!: Observable<FeatureCollection<MultiLineString, TAGARRETProperties>>;

  public defis : Defi | null = null;
  defiNew !: Observable<Defi>;

  constructor(private defiService: DefisService, public dialogueReference: MatDialogRef<CreationDefiComponent>, private serviceArret:GestionLignesArretsService,private serviceDefi:DefisService) {
    /*this.defisRecherche = combineLatest([this.arretTAg, this.filtreSubj]).pipe(
  map( ([LD, f]) => LD.features.filter( d => d.properties.LIBELLE.indexOf(f) >= 0 ))
)*/
   }

  ngOnInit(): void {
    this.getArrets();

    this.arretTAg = this.serviceArret.getArrets();

  }


  creerDefi(defi:string,titre:string,dateDecreation:string,auteur:string,type:string,dateDemodification:string,
    arrets:string,distanciel:string,point:string,duree:string,indice:string,evalution:string,epilogue:string,description:string,motCles:string):void{
      this.defiNew = this.serviceDefi.addNewdefi(defi,titre,dateDecreation,auteur,type,dateDemodification,arrets,distanciel,point,duree,indice,evalution,epilogue,description,motCles)
      this.fermerDefi();
    }

  form = new FormGroup({
    creation: new FormGroup({
      defi: new FormControl('',[
        //Validators.required
      ]),
      titre: new FormControl('', [
       // Validators.required,
       // Validators.minLength(3)
      ]),
      arrets: new FormControl('', [
        //Validators.required
      ]),
      motscles: new FormControl('', [
       // Validators.required
      ]),
      description: new FormControl('', [
       // Validators.required
      ])
    })
  })
/*
  getDefi(){
    return this.form.get('creation.defi');
  }

  getTitre(){
    return this.form.get('creation.titre');
  }

  getArrets(){
    return this.form.get('creation.arrets');
  }

  getMotcles(){
    return this.form.get('creation.motscles');
  }

  getDescription(){
    return this.form.get('creation.description');
  }
  ajoutDefi(){
    this.defis =
    {
      id: this.getDefi()?.value,
      titre: this.getTitre()?.value,
      dateDeCreation: "",
      auteur: '',
      description: this.getDescription()?.value,
      latitude: 0,
      longitude: 0,
     type: '',
     dateDeModification: '',
     arret: '',
     distanciel: '',
     motCles: '',
     points: 0,
     duree: '',
     indices: '',
     evaluation: '',
     epilogue: '',
    }

    console.log(this.defis);
    this.defiService.addDefis(this.defis);

    this.dialogueReference.close();
  }*/

  fermerDefi(){
    this.dialogueReference.close();
  }

  getArrets(){
    this.serviceArret.getArrets().subscribe(
      (response)=>{
       this.donneesArret = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  }
