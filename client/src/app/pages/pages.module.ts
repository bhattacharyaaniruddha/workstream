import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacklogsComponent } from './workstream/backlogs/backlogs.component';
import { ProjectsComponent } from './workstream/projects/projects.component';
import { CreateBacklogsComponent } from './workstream/create-backlogs/create-backlogs.component';
import { CreateProjectComponent } from './workstream/create-project/create-project.component';
import { GroupManagementComponent } from './admin/group-management/group-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AuthGuard } from '../auth/auth-guard.guard';


const routes: Routes = [
  {
    path: 'app/project-dashboard',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/create-project',
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app/group-management',
    component: GroupManagementComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'app/backlogs',
  //   component: BacklogsComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'app/projects/:id/create-backlogs',
    component: CreateBacklogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "app/projects/:id",
    component: BacklogsComponent,
    canActivate: [AuthGuard]
  },
];


@NgModule({
  declarations: [
    BacklogsComponent,
    ProjectsComponent,
    CreateBacklogsComponent,
    CreateProjectComponent,
    GroupManagementComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, FormsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}, },
    provideNativeDateAdapter()
  ],
  exports: [
    BacklogsComponent,
    ProjectsComponent,
    CreateBacklogsComponent,
    CreateProjectComponent,
    GroupManagementComponent,
    UserManagementComponent
  ]
})
export class PagesModule { }
