import { Component } from '@angular/core';
import { WorkstreamService } from '../../../services/workstream.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects:any = [];

  constructor(private workStreamService: WorkstreamService, public router: Router) {}

  ngOnInit() {
    this.workStreamService.toDo_getProject().subscribe((resp:any) => {
      if(resp.status === 'success') {
        this.workStreamService.projectsArray.next(resp.response);
      } else {

      }
    });

    this.workStreamService.projectsArrayData.subscribe((resp:any) => {
      if(this.projects.length > 0) {
        this.projects.push(resp);
      } else {
        this.projects = resp;
      }
    });

  }

  navigateRoute() {
    this.router.navigate(['/app/create-project'])
  }

  navigateToProject(projectId: string) {
    this.router.navigate([`/app/projects/${projectId}`]);
  }
}
