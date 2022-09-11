import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://10.66.13.85:32001/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(nomPrenom:string ,cin: string,dateNais: string,login: string ,site: string ,username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      nomPrenom ,
      cin,
      dateNais,
      login ,
      site,
      username,
      email,
      password
    }, httpOptions);
  }
}
