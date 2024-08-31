import { Component } from '@angular/core';
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { UserAuthService } from '../../../services/user-auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrl: './group-management.component.css'
})
export class GroupManagementComponent {

  dataSource:any = [];

  constructor(private dialog: MatDialog, private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.toDo_getGroup().subscribe((resp) => {
      if(resp.status === 'success') {
        this.authService.groupsArray.next(resp.response);
      } else {

      }
    });

    this.authService.groupsArrayData.subscribe((resp:any) => {
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
      data: {popupName: "addGroup"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deStructure(data:any) {
    return data.map((item:any) => item.email).join(", ");
  } 
}
