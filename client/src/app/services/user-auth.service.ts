import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public usersArray = new Subject<any>();
  usersArrayData = this.usersArray.asObservable();

  public groupsArray = new Subject<any>();
  groupsArrayData = this.groupsArray.asObservable();

  constructor(private http: HttpClient, private router:Router) { }


  toDo_addUser(body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/addUser", body, {headers: headers});
  }

  toDo_getUsers() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/getUsers", {headers: headers});
  }

  toDo_addGroup(body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/addGroup", body, {headers: headers});
  }

  toDo_getGroup() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/getGroup", {headers: headers});
  }

  toDo_getCompanies() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/getCompanies", {headers: headers});
  }

  toDo_getAllManagersByCoy() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/getAllManagersByCoy", {headers: headers});
  }

  toDo_registerNewUser(body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/registerNewUser", body, {headers: headers});
  }

  toDo_login(body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("https://taskboard-ndzjolpn.b4a.run/api/userops/login", body, {headers: headers});
  }








  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  refreshToken(): Observable<any> {
    return this.http.post<{ token: string }>('/api/auth/refresh', {}).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  decodeToken() : any{
    let accessToken = JSON.parse(JSON.stringify(sessionStorage.getItem('accessToken'))).split('.')[1];
    return atob(accessToken)
  }

  logout(): void {
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/login'])
  }


}
