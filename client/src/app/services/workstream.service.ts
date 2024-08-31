import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkstreamService {

  public backLogsArray = new Subject<any>();
  backLogsArrayData = this.backLogsArray.asObservable();

  public projectsArray = new Subject<any>();
  projectsArrayData = this.projectsArray.asObservable();

  constructor(private http: HttpClient) { }


  toDo_createTask(body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("http://localhost:3001/api/todoops/create", body, {headers: headers});
  }

  toDo_getGBacklogs(body:any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("http://localhost:3001/api/todoops/getTasks", body, {headers: headers});
  }

  toDo_addProject(body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>("http://localhost:3001/api/todoops/addProject", body, {headers: headers});
  }

  toDo_getProject() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>("http://localhost:3001/api/todoops/getProject", {headers: headers});
  }
}
