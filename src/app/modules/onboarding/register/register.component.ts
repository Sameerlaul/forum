import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  otp: any = '';
  otpFlag = true
  email_token: any;
  error;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  constructor(private onboardingService: OnboardingService, private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.otpFlag = true
    this.error=null
    this.registerForm = new FormGroup({
      'fullname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobile_number': new FormControl(null, [Validators.required, Validators.minLength(7)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.spinner.show()
    if(this.registerForm.valid){
      this.onboardingService.register(this.registerForm.value).subscribe( (data: any) => {
        console.log(data);
        //(<any>$('#exampleModal').modal('show'))
        this.email_token = data.result.token;
        this.spinner.hide()
        document.getElementById('signin').click();
      })
    }
    else{
      this.error = true
      this.spinner.hide()
    }
    
   // document.getElementById('signin').click();
  }

  onClick() {
    console.log("I am clicked")
  }

  onOtpChange(event) {
    this.otp = event;
    //console.log(this.otp)
    if (this.otp.length === 6) {
      this.otpFlag = false;
    }
  }

  verify() {
    const tempObj = {
      token: this.email_token,
      sent_otp: this.otp
    }
    // console.log(tempObj)
    this.onboardingService.verifyEmail(tempObj).subscribe(
      (data: any) => {
        console.log(data)
        if (data.status.code !== "00") {
          //this.errorVerification = data.status.message;
        } else {
          // this.toastr.success('', 'Thank you for registering.You are successfully registered on PetBlock', {
          //   timeOut: 3000
          // });

          document.getElementById('verifymodal').click();
          this.router.navigateByUrl('/onboarding')
        }


      }
    )
  }
}
