import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
//import * as CryptoJS from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any;
  temp = {};
  questionList = []
  constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService) {
    this.temp = {
      f_page_number: 1,
      f_page_size: 10,
      f_tag_id: null
    }
  }

  ngOnInit() {
    this.spinner.show()
    // const tempData = CryptoJS.AES.decrypt(localStorage.getItem('userData'), 'SSKKiHSHSH').toString(CryptoJS.enc.Utf8);
    // this.userData = JSON.parse(tempData)
    const tempData = localStorage.getItem('userData')
    this.userData = JSON.parse(tempData)
    console.log(this.userData)

    this.dashboardService.questionList(this.temp, this.userData.token).subscribe((data: any) => {
      this.spinner.hide()
      if (data.status.code === "00") {
        this.questionList = data.result.data
      } else {
        alert('Something went wrong!')
      }
    })
  }

}
