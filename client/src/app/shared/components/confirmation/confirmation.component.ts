import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserAuthService } from '../../../services/user-auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
})
export class ConfirmationComponent {

  toppingList = [1,2,3]
  companyList = ['Others']
  allUsersList: any = [];
  readonly data = inject<any>(MAT_DIALOG_DATA);

  addUserForm: FormGroup;
  addGroupForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>, private fb: FormBuilder, private authService: UserAuthService) {
    this.addUserForm = this.fb.group({
      fullname: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl(),
      department: new FormControl(),
      jobTitle: new FormControl(),
      location: new FormControl(),
      company: new FormControl(),
      addNewCompany: new FormControl(),
      isManager: new FormControl(),
      isEnabled: new FormControl()
    });

    this.addGroupForm = this.fb.group({
      groupName: new FormControl(),
      allUsers: new FormControl()
    })
  }


  ngOnInit() {
      this.authService.toDo_getCompanies().subscribe((resp:any) => {
        if(resp.status === 'success' && resp.response !== null) {
          this.companyList = [...resp.response, ...this.companyList]
        }
      });

      this.authService.toDo_getUsers().subscribe((resp) => {
        if(resp.status === 'success') {
          this.allUsersList = resp.response;
        }
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {

    if(this.data.popupName === 'addUser') {
      let body = {
        fullname: this.addUserForm.controls['fullname'].value,
        username: this.addUserForm.controls['username'].value,
        email: this.addUserForm.controls['email'].value,
        password: this.addUserForm.controls['password'].value,
        department: this.addUserForm.controls['department'].value,
        jobTitle: this.addUserForm.controls['jobTitle'].value,
        location: this.addUserForm.controls['location'].value,
        company: this.addUserForm.controls['company'].value === 'Others' ? this.addUserForm.controls['addNewCompany'].value : this.addUserForm.controls['company'].value,
        isManager: this.addUserForm.controls['isManager'].value,
        isEnabled: this.addUserForm.controls['isEnabled'].value,
      }


      this.authService.toDo_addUser(body).subscribe((resp => {
        if(resp.status === 'success') {

        } else {

        }
        this.addUserForm.reset();
        this.dialogRef.close();

      }));
    } else if(this.data.popupName === 'addGroup') {
      let body = {
        groupName: this.addGroupForm.controls['groupName'].value,
        allUsers: this.addGroupForm.controls['allUsers'].value !== null
          ? this.addGroupForm.controls['allUsers'].value.map((id: string) => {
            const user = this.allUsersList.find((user: any) => user._id === id);
            return user ? { email: user.email, fullname: user.fullName } : null;
          }).filter((user: any) => user !== null) : []

      }

      console.log("BODY", body)

      this.authService.toDo_addGroup(body).subscribe((resp => {
        if(resp.status === 'success') {

        } else {

        }
        this.addGroupForm.reset();
        this.dialogRef.close();

      }));
    }

  }

}
