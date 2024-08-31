import { Component } from '@angular/core';
import { WorkstreamService } from '../../../services/workstream.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-backlogs',
  templateUrl: './backlogs.component.html',
  styleUrl: './backlogs.component.css'
})
export class BacklogsComponent {

  projectInfo: any = {};
  
  dataSource:any = [];

  constructor(private workStreamService: WorkstreamService, private router: Router) {}

  ngOnInit() {

    this.workStreamService.toDo_getProject().subscribe((resp) => {
      if(resp.status === 'success') {
        this.projectInfo = resp.response.filter((item:any) => item._id === this.router.url.split('/')[3])[0];

        if(this.projectInfo === undefined || this.projectInfo === null || Object.keys(this.projectInfo).length <= 0) {
          this.router.navigate(['/app/project-dashboard'])
        } else {
          this.workStreamService.toDo_getGBacklogs({projectId: this.router.url.split('/')[3]}).subscribe((resp:any) => {
            if(resp.status === 'success') {
              this.workStreamService.backLogsArray.next(resp.response);
            } else {
      
            }
          });
        }

      }
    })


    this.workStreamService.backLogsArrayData.subscribe((resp:any) => {
      if(this.dataSource.length > 0) {
        this.dataSource.push(resp);
      } else {
        this.dataSource = resp;
      }
    });

  }

  navigateRoute() {
    console.log(this.router.url)
    this.router.navigate(['/app/projects/' + this.router.url.split('/')[3] + '/create-backlogs'])
  }
}
