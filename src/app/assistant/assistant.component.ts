import { Defis, GrehamisService } from './../grehamis.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators'
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';


@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})

export class AssistantComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:5000/api';
  filtreSubj = new BehaviorSubject<string>('')
  defisRecherche: Observable<Defis[]>;
  defis: Observable<Defis[]>;
  defiChoisi: Defis | undefined;


  constructor(private httpService: HttpClient, private grechamis:GrehamisService) {
    this.defis = this.grechamis.getDefis();

    this.defisRecherche = combineLatest([this.defis, this.filtreSubj]).pipe(
      map( ([LD, f]) => LD.filter( d => d.auteur.indexOf(f) >= 0 ))
    )
    //this.rechercherDefis();
  }

  ngOnInit(): void {
    //map
    const myfrugalmap = L.map('frugalmap').setView([45.2, 5.75], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    // ICONES
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });

    this.defis.subscribe(
      (data: Defis[]) => {
        data.forEach((i: Defis) =>
        {L.marker([i.latitude, i.longitude], {icon: myIcon}).bindPopup(i.titre+"<br/>"+"<p></p>"+
                                                                       "ID: "+i.id+"<p></p>"+
                                                                       "Auteur: "+i.auteur+"<p></p>"+
                                                                       "Arret: "+i.arret)
                                                                       .addTo(myfrugalmap)
      });

    });

  }

  choisirDefis(d: Defis){
    this.defis.subscribe(
      response => this.defiChoisi = response.find(i=>i.id===d.id)
    )
  }

  commencerVisite(d: Defis) {
    console.log(d.arret)
  }

}
