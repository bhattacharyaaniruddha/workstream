import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserAuthService, private router: Router) {
    this.registerForm = this.fb.group({
      fullname: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      company: new FormControl("Others", [Validators.required]),
      addNewCompany: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const accessToken = sessionStorage.getItem('accessToken');
    
    console.log('Refresh Token:', refreshToken);
    console.log('Access Token:', accessToken);
  
    if (refreshToken && accessToken) {
      console.log("Confirmed");
      this.router.navigate(['/app/project-dashboard']);
    }
  }


  submit() {
    let body = {
      fullname: this.registerForm.controls['fullname'].value,
      username: this.registerForm.controls['username'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      department: this.registerForm.controls['department'].value,
      company: this.registerForm.controls['company'].value === 'Others' ? this.registerForm.controls['addNewCompany'].value : this.registerForm.controls['company'].value,
    }


    this.authService.toDo_registerNewUser(body).subscribe((resp => {
      if(resp.status === 'success') {
        sessionStorage.setItem('refreshToken', resp.refreshToken);
        sessionStorage.setItem('accessToken', resp.accessToken);
        const notificationTray = localStorage.getItem('notificationTray');
        if (!notificationTray) {
            localStorage.setItem('notificationTray', JSON.stringify([]));
        }
        this.registerForm.reset();
        this.router.navigate(['/app/project-dashboard'])
      } else {

      }
    }));
  }


}
