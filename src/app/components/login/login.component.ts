import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isButtonDisabled: boolean = false;

  constructor(private authSer: AuthService, private router: Router, private toastr: ToastrService) { }

  myForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get fdata() {
    return this.myForm.controls;
  }

  // Login API call
  onSubmit():void {
    this.isButtonDisabled = true;
    let formData = this.myForm.getRawValue();
    this.authSer.post(formData, 'https://demo.credy.in/api/v1/usermodule/login/')
      .subscribe((res: any) => {
        this.isButtonDisabled = false;
        if (res.is_success === true) {
          localStorage.setItem("_token", res.data.token);

          this.authSer.isLoginOut.next(true)
          this.toastr.success('WELCOME', 'Login success');

          this.router.navigate(['/movies'])
        }
      },
        (error) => {
          this.isButtonDisabled = false;
          if (error.error.is_success === false) {
            this.toastr.error(error.error.error.message, 'Login failed');
          }
        }
      )
  }
}
