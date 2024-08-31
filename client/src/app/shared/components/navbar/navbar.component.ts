import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authService: UserAuthService, private notificationService: NotificationService, private route: ActivatedRoute) {}

  notifications:any = [];
  title: any ="Welcome";
  displayName:any;

  ngOnInit() {
    this.calculateHeaderTitle();
    let name = JSON.parse(this.authService.decodeToken())?.fullname.split(" ")
    this.displayName = name[0][0] + name[1][0];

    const storedNotifications = localStorage.getItem('notificationTray');
    this.notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    console.log(this.notifications);
    
    this.notificationService.notificationData.subscribe((resp: any) => {
      if(resp === 'tray updated') {
        const storedNotifications = localStorage.getItem('notificationTray');
        this.notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
        console.log(this.notifications);
      }
    })
  }

  clickToLogout() {
    this.authService.logout();
  }

  isDropdownVisible: boolean = false;
  dropdownContent: string = '';

  toggleDropdown(content: string) {
    this.isDropdownVisible = !this.isDropdownVisible;
    this.dropdownContent = content;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInside = target.closest('.account-center');
    if (!isInside) {
      this.isDropdownVisible = false;
    }
  }

  handleDropdownClick() {
    if (this.dropdownContent === 'logout') {
      this.clickToLogout(); // Call logout function
    }
    this.isDropdownVisible = false; // Hide dropdown after clicking
  }

  calculateHeaderTitle() {
    if(this.router.url.includes('user-management')) {
      this.title = 'User Management'
    } else if(this.router.url.includes('group-management')) {
      this.title = 'Group Management'
    } else if(this.router.url.includes('project-dashboard')) {
      this.title = 'Project'
    }
  }

}
