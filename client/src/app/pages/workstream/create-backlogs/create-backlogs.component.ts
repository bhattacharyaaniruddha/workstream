import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkstreamService } from '../../../services/workstream.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-create-backlogs',
  templateUrl: './create-backlogs.component.html',
  styleUrl: './create-backlogs.component.css'
})
export class CreateBacklogsComponent {
  showAddCheckFlag = false;
  addTaskForm: FormGroup;
  formForAddCheckList: FormGroup;
  checkLists:any = [];
  addTaskFlag = false;
  dataSource:any = [];
  priorityList = ['High', "Medium", 'Low']
  typeList = [
    "Feature Implementation",
    "Bug Fix",
    "Technical Debt",
    "Performance Improvement",
    "Refactoring",
    "Security Enhancement",
    "UI/UX Enhancement",
    "Integration Task",
    "Documentation",
    "Research/Spike"
  ];
  projectInfo:any = {}; 
  user: any = {};

  constructor(private fb: FormBuilder, private workStreamService: WorkstreamService, private router: Router, private authService: UserAuthService) {

    this.user = JSON.parse(this.authService.decodeToken())

    this.formForAddCheckList = this.fb.group({
      title: new FormControl("", [Validators.required]),
      description: new FormControl(""),
      type: new FormControl("")
    });

    this.addTaskForm = this.fb.group({
      title: new FormControl(),
      originator: new FormControl(this.user.fullname),
      priority: new FormControl(),
      createdOn: new FormControl(new Date()),
      description: new FormControl(),
      type: new FormControl(),
      areaOfConcern: new FormControl(),
      reviewers: new FormControl(),
      comments: new FormControl()
    })

  }

  ngOnInit() {
    this.workStreamService.toDo_getProject().subscribe((resp) => {
      if(resp.status === 'success') {
        this.projectInfo = resp.response.filter((item:any) => item._id === this.router.url.split('/')[3])[0];

        if(this.projectInfo === undefined || this.projectInfo === null || Object.keys(this.projectInfo).length <= 0) {
          this.router.navigate(['/app/project-dashboard'])
        }

      }
    })
  }

  addToCheckList() {

    if(this.formForAddCheckList.valid) {
      this.checkLists.push({
        title: this.formForAddCheckList.controls['title'].value,
        description: this.formForAddCheckList.controls['description'].value,
        type: this.formForAddCheckList.controls['type'].value
      });
      this.formForAddCheckList.reset();
      this.showAddCheckFlag = false;
    }
    
  }

  // addCloseTask() {
  //   if(this.addTaskFlag === false) {
  //     this.addTaskFlag = true;
  //   } else {
  //     this.addTaskFlag = false;
  //     this.addTaskForm.reset();
  //   }
  // }

  submit() {
    let body = {
      checkLists: this.checkLists,
      title: this.addTaskForm.controls['title'].value,
      originator: this.addTaskForm.controls['originator'].value,
      priority: this.addTaskForm.controls['priority'].value,
      createdOn: this.addTaskForm.controls['createdOn'].value,
      description: this.addTaskForm.controls['description'].value,
      type: this.addTaskForm.controls['type'].value,
      areaOfConcern: this.addTaskForm.controls['areaOfConcern'].value,
      reviewers: this.addTaskForm.controls['reviewers'].value,
      comments: this.addTaskForm.controls['comments'].value,
      projectId: this.projectInfo._id,
      projectName: this.projectInfo.projectName,
      creatorId: this.user._id
    }

    this.workStreamService.toDo_createTask(body).subscribe((resp => {
      if(resp.status === 'success') {

      } else {

      }
      this.addTaskForm.reset({
        originator: this.user.fullname,
        createdOn: new Date()
      });
      // this.addTaskForm.controls['originator'].setValue(this.user.fullname);
      // this.addTaskForm.controls['createdOn'].setValue(new Date());
      this.formForAddCheckList.reset();
      this.checkLists = [];
    }));
  }

  discard() {
    this.addTaskForm.reset({
      originator: this.user.fullname,
      createdOn: new Date()
    });
    this.formForAddCheckList.reset();
    this.showAddCheckFlag=false;
    this.router.navigate(['/app/projects/'+this.projectInfo._id])
  }
}
