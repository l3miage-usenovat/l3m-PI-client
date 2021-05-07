import { Observable } from 'rxjs';
import { Chami } from './../ChamoiDefinition';
import { UsersService } from './../users.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  @Input() Ischamis: boolean = false;
  chamisNew !: Observable<Chami>;

  constructor(private serviceChamis:UsersService) { }

  ngOnInit(): void {
  }

  // fonction d'insccription d'un nouveau chamis
  inscrireChamis(email:string, login:string, age:string, ville:string, description:string): void{


   this.chamisNew = this.serviceChamis.addNewUser(email,login,age,ville,description);
   this.Ischamis === true;

  }
}
