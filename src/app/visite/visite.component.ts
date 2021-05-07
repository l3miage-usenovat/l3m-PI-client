import { HttpClient } from '@angular/common/http';
import { Defis, Description, GrehamisService } from './../grehamis.service';
import { Component, defineInjectable, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {

  @Input() defi: Defis | undefined;
  labele!: string;
  description!: string;

  descriptionsTot!:Observable<Description[]>;
  descriptionsChoisiList!: Description[];

  etapeSuiv: boolean = false;
  point: number = 0;

  constructor(private httpService: HttpClient, private grechamis: GrehamisService, private route: ActivatedRoute) {
    this.descriptionsTot = this.grechamis.getDescriptions();
    this.descriptionsTot.subscribe(
      response => this.descriptionsChoisiList = response.filter(i=>i.id===this.defi?.id)
    )
  }

  ngOnInit(): void {
    /*const id = this.route.snapshot.params['labele'];
    this.labele = this.getAppareilByLebele(+labele).labele;
    this.description = this.getAppareilByLabele(+labeleid).description;*/
  }

  pointI(d:Description){
    this.etapeSuiv = true;
    this.point = this.point - d.points
  }

  pointQ(d:Description){
    this.etapeSuiv = true;
    this.point = this.point + d.points
  }



}
