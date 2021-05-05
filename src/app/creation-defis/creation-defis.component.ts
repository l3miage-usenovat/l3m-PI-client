import { DefisService } from './../defis.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Defi} from '../ChamoiDefinition';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-creation-defis',
  templateUrl: './creation-defis.component.html',
  styleUrls: ['./creation-defis.component.scss']
})
export class CreationDefisComponent implements OnInit {

  public defis : Defi | null = null;

  constructor(private defiService: DefisService, public dialogueReference: MatDialogRef<CreationDefisComponent>) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    creation: new FormGroup({
      defi: new FormControl('',[
        Validators.required
      ]),
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      arrets: new FormControl('', [
        Validators.required
      ]),
      motscles: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ])
    })
  })

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
      dateDeCreation: new Date(),
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
  }

  fermerDefi(){
    this.dialogueReference.close();
  }
  }






