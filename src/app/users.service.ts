import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chami } from './ChamoiDefinition';


@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private requete: HttpClient) { }

  fetchUsers(): Observable<Chami[]>{
    return this.requete.get<Chami[]>('http://localhost:5000/api/users/');
  }

  addNewUser(person:Chami): void{

    this.requete.post<Chami>('http://localhost:5000/api/users/'+person.pseudo,person);
    console.log('succed');
  }
}
