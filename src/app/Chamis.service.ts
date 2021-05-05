import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { chamis } from './chamis';

@Injectable({
providedIn:'root'
})
export class ChamisService{
  private apiServerUrl = '';
 constructor(private http: HttpClient) {}

 public getChamis(): Observable<chamis[]>{
  return this.http.get<chamis[]>(`${this.apiServerUrl}/api/users`);
 }
}

