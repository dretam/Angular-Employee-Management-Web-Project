import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  detailForm!: FormGroup;

  errorMessageNotMatch: string | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.detailForm = this.loginForm();
  }

  loginForm() {
    return this.formBuilder.group({
      username: ['admin', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['123456', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmit() {
    const value = this.detailForm.getRawValue();
    if(value.username == 'admin' && value.password == '123456') {
      this.errorMessageNotMatch = undefined;
      console.log(`Form valid: ${JSON.stringify(value)}`);
  
      localStorage.setItem('token', 'token');
  
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 300);
    } else{
      this.errorMessageNotMatch = 'Username and password are not matched. Please try again!';
      this.router.navigateByUrl('/login');
    }
  }
}
