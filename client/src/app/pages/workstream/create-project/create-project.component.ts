import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WorkstreamService } from '../../../services/workstream.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  toppingList = [1,2,3]
  allUsersList:any = [];
  companyList:any = [];
  addProjectForm: FormGroup;
  selectedCompanies: string[] = [];
  companyManagersMap: any = [];
  user: any = {};

  constructor(private fb: FormBuilder, private workStreamService: WorkstreamService, private authService: UserAuthService, private router: Router) {
    this.user = JSON.parse(this.authService.decodeToken())

    this.addProjectForm = this.fb.group({
      projectName: new FormControl(),
      originator: new FormControl(this.user.fullname),
      gitLink: new FormControl(),
      createdOn: new FormControl(new Date()),
      cownerCompany: new FormControl(),
      managers: new FormArray([]),
      description: new FormControl(),
      targetDate: new FormControl()
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

    this.authService.toDo_getAllManagersByCoy().subscribe((resp) => {
      if (resp.status === 'success') {
        this.companyManagersMap = {};
        resp.response.forEach((company: any) => {
          this.companyManagersMap[company._id] = company.users;
        });
      }
    })
  }

  get managers() {
    return this.addProjectForm.get('managers') as FormArray;
  }

  onCompanyChange(selectedCompanies: string[]) {
    // Clear the existing managers
    this.managers.clear();
    this.selectedCompanies = selectedCompanies; // Update selected companies

    // Create a FormGroup for each selected company
    selectedCompanies.forEach(company => {
      const managerGroup = this.fb.group({
        manager: new FormControl()
      });
      this.managers.push(managerGroup);
    });
  }

  submit() {
    let body = {
      projectName: this.addProjectForm.controls['projectName'].value,
      originator: this.addProjectForm.controls['originator'].value,
      gitLink: this.addProjectForm.controls['gitLink'].value,
      createdOn: this.addProjectForm.controls['createdOn'].value,
      cownerCompany: this.addProjectForm.controls['cownerCompany'].value,
      targetDate: this.addProjectForm.controls['targetDate'].value,
      creatorId: this.user._id,
      managers: this.addProjectForm.controls['managers'].value.map((manager: any) => {
        const selectedManagerId = manager.manager; // Get the selected manager ID
        const selectedCompanyId = ''; // Get the associated company ID
        // Find the corresponding manager details in the allUsersList
        const selectedManager = this.allUsersList.find((user: any) => user._id === selectedManagerId);
        console.log("selectedManager",selectedManager)
        return {
          managerId: selectedManagerId,
          companyId: selectedManager.company,
          fullName: selectedManager ? selectedManager.fullName : null,
          email: selectedManager ? selectedManager.email : null
        };
      }),
      description: this.addProjectForm.controls['description'].value,
    }

    this.workStreamService.toDo_addProject(body).subscribe((resp => {
      if(resp.status === 'success') {

      } else {

      }
      this.addProjectForm.reset();
    }));
  }

  discard() {
    this.addProjectForm.reset({
      originator: this.user.fullname,
      createdOn: new Date()
    });
    this.router.navigate(['/app/project-dashboard'])
  }

}
