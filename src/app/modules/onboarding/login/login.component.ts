import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/services/onboarding.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  userData: any
  forgot_email: any;
  successMessage: string;
  errorFromServer: any;
  constructor(private onboardingService: OnboardingService, private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.successMessage =null;
    this.errorFromServer= '';
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.spinner.show()
    console.log(this.loginForm.value)
    this.onboardingService.login(this.loginForm.value).subscribe((data: any) => {
      this.spinner.hide()
      if (data.status.code === "00") {
        console.log(data)
        let datatoStorage = CryptoJS.AES.encrypt(JSON.stringify(data.result), 'SSKKiHSHSH').toString();
        localStorage.setItem('userData', datatoStorage);
        this.router.navigateByUrl('/')
        // const tempData = CryptoJS.AES.decrypt(localStorage.getItem('userData'), 'SSKKiHSHSH').toString(CryptoJS.enc.Utf8);
        // this.userData = JSON.parse(tempData)
        // console.log(this.userData)
      }
      else{
        this.errorFromServer= data.status.message;
      }
    })
  }

  sendForgotLink() {
    const tempObj = {
      email: this.forgot_email
    }

    this.onboardingService.forgotPassword(tempObj).subscribe(
      (data: any) => {
        console.log(data)
        if (data.status.code !== "00") {
         
        } else {
          this.successMessage = "Email sent successfully for reset password";
          // this.restSendBtn = true;
          // this.forgotLoaderFlag = false;
        }
      })

  }
}
