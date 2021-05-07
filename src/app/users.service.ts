import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chami } from './ChamoiDefinition';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  ressourceChamis:string = 'http://localhost:5000/api/users/';


  constructor(private requete: HttpClient) { }

  fetchUsers(): Observable<Chami[]>{
    return this.requete.get<Chami[]>('http://localhost:5000/api/users/');
  }

  addNewUser(email:string,login:string,age:string,ville:string,description:string): Observable<Chami>{
    let newChamis :Chami={
      email: email,
      pseudo: login,
      age:age,
      ville:ville,
      description:description
    }
    return this.requete.post<Chami>(this.ressourceChamis+newChamis.pseudo,newChamis);

  }
  updateChamis(email:string,login:string,age:string,ville:string,description:string): Observable<Chami>{
    let newChamis :Chami={
      email: email,
      pseudo: login,
      age:age,
      ville:ville,
      description:description
    }
    console.log(this.requete.put<Chami>(this.ressourceChamis+newChamis.pseudo,newChamis))
    return this.requete.put<Chami>(this.ressourceChamis+newChamis.pseudo,newChamis);

  }
}
