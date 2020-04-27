import { Component, OnInit } from '@angular/core';
//import * as CryptoJS from 'crypto-js';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ques',
  templateUrl: './add-ques.component.html',
  styleUrls: ['./add-ques.component.css']
})
export class AddQuesComponent implements OnInit {

  title;
  body;
  tag
  userData: any = {
    token: '',
    id: ''
  };
  constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    // const tempData = CryptoJS.AES.decrypt(localStorage.getItem('userData'), 'SSKKiHSHSH').toString(CryptoJS.enc.Utf8);
    // this.userData = JSON.parse(tempData)
    const tempData = localStorage.getItem('userData')
    this.userData = JSON.parse(tempData)
    console.log(this.userData)
  }

  onSubmit() {
    this.spinner.show()
    let tempObj = {
      que_id: null,
      title: this.title,
      body: this.body,
      user_id: this.userData.id,
      tag_id: +this.tag
    }
    console.log(tempObj)
    this.dashboardService.submitQuestion(tempObj, this.userData.token).subscribe((data: any) => {
      if (data.status.code == "00") {
        this.spinner.hide()
        this.router.navigateByUrl('/')
      }
      else {
        this.spinner.hide()
        alert('Something went wrong')
      }
    })
  }

}
