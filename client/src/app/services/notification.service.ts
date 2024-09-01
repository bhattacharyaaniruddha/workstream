import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { WorkstreamService } from './workstream.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket

  public notification = new Subject<any>();
  notificationData = this.notification.asObservable();

  constructor(private workStreamService: WorkstreamService, private authService: UserAuthService) {
    this.socket = io('https://taskboard-ndzjolpn.b4a.run', {
      transports: ['websocket'], // Specify the transport method
      reconnection: true,        // Enable reconnection
    });



    this.socket.on('addToBackLogs', (data) => {
      if(Object.keys(data).length > 0) {
        this.workStreamService.backLogsArray.next(data.data);
        let notificationTray:any = JSON.parse(JSON.stringify(localStorage.getItem('notificationTray')));
        notificationTray = JSON.parse(notificationTray)
        notificationTray.push(data.message);
        localStorage.setItem('notificationTray', JSON.stringify(notificationTray));
        this.notification.next("tray updated");
      }
    });


    this.socket.on('addProjects', (data) => {
      console.log("called here")
      if(Object.keys(data).length > 0) {
        this.workStreamService.projectsArray.next(data.data);
        let notificationTray:any = JSON.parse(JSON.stringify(localStorage.getItem('notificationTray')));
        notificationTray = JSON.parse(notificationTray)
        notificationTray.push(data.message);
        localStorage.setItem('notificationTray', JSON.stringify(notificationTray));
        this.notification.next("tray updated");
      }
    });


    this.socket.on('addUsers', (data) => {
      if(Object.keys(data).length > 0) {
        this.authService.usersArray.next(data.data);
        let notificationTray:any = JSON.parse(JSON.stringify(localStorage.getItem('notificationTray')));
        notificationTray = JSON.parse(notificationTray)
        notificationTray.push(data.message);
        localStorage.setItem('notificationTray', JSON.stringify(notificationTray));
        this.notification.next("tray updated");
      }
    });


    this.socket.on('addGroups', (data) => {
      if(Object.keys(data).length > 0) {
        this.authService.groupsArray.next(data.data);
        let notificationTray:any = JSON.parse(JSON.stringify(localStorage.getItem('notificationTray')));
        notificationTray = JSON.parse(notificationTray)
        notificationTray.push(data.message);
        localStorage.setItem('notificationTray', JSON.stringify(notificationTray));
        this.notification.next("tray updated");
      }
    });


  }
}
