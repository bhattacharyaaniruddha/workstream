import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  dataSource:any = [];

  constructor(private dialog: MatDialog, private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.toDo_getUsers().subscribe((resp) => {
      if(resp.status === 'success') {
        this.authService.usersArray.next(resp.response);
      } else {

      }
    });

    this.authService.usersArrayData.subscribe((resp:any) => {
      if(this.dataSource.length > 0) {
        this.dataSource.push(resp);
      } else {
        this.dataSource = resp;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      height: 'auto',
      width: '1200px',
      data: {popupName: "addUser"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
