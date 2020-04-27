import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingService } from 'src/app/services/onboarding.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  param: any;
  token: any;
  new_password: any;
  constructor(private route: ActivatedRoute, private router: Router, private onboardingService: OnboardingService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.param = params; 
      this.token = this.param.params.token;
    })
  }

  reset() {
    //this.resetLoaderFlag = true;
    if(!this.new_password) {
     // this.error = "Please enter password"
    }
     else {
      const tempObj = {
        token: this.token,
        new_password: this.new_password
      }
      this.onboardingService.resetPassword(tempObj).subscribe(
        (data:any) => {
          if(data.status.code !== "00") {
     
            // this.error= data.status.message;
            // this.resetLoaderFlag = false;
          } else {
           // this.resetLoaderFlag = false;
            alert("Password has been reset successfully.")
            this.router.navigateByUrl('/')
          }
        },
        (error) => {
    
         // this.resetLoaderFlag = false;
        }
        )
    }
  }

}
