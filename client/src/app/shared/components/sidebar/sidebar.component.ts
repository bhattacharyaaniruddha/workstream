import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(public router: Router, private route: ActivatedRoute) {}

  
  calculateURL() {
    console.log('/app/projects/'+this.router.url.split('/')[3])
    return '/app/projects/'+this.router.url.split('/')[3]
  }
}
