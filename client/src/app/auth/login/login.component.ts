import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserAuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
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
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }


    this.authService.toDo_login(body).subscribe((resp => {
      if(resp.status === 'success') {
        sessionStorage.setItem('refreshToken', resp.refreshToken);
        sessionStorage.setItem('accessToken', resp.accessToken);
        const notificationTray = localStorage.getItem('notificationTray');
        if (!notificationTray) {
            localStorage.setItem('notificationTray', JSON.stringify([]));
        }
        this.loginForm.reset();
        this.router.navigate(['/app/project-dashboard'])
      } else {

      }
    }));
  }

  guestLogin() {
    let body = {
      email: 'aniruddha2@gmail.com',
      password: 'India@99'
    }


    this.authService.toDo_login(body).subscribe((resp => {
      if(resp.status === 'success') {
        sessionStorage.setItem('refreshToken', resp.refreshToken);
        sessionStorage.setItem('accessToken', resp.accessToken);
        const notificationTray = localStorage.getItem('notificationTray');
        if (!notificationTray) {
            localStorage.setItem('notificationTray', JSON.stringify([]));
        }
        this.loginForm.reset();
        this.router.navigate(['/app/project-dashboard'])
      } else {

      }
    }));
  }
}
