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
  userData: any = {
    token: '',
    id: ''
  };
  temp = {};
  questionList = []
  pageSize = 3;
  p = 1;
  total;
  tag = 5

  constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService) {
    this.temp = {
      f_page_number: this.p,
      f_page_size: this.pageSize,
      f_tag_id: null
    }
  }

  ngOnInit() {
    console.log("home")
    this.spinner.show()
    this.tag = 5
    // const tempData = CryptoJS.AES.decrypt(localStorage.getItem('userData'), 'SSKKiHSHSH').toString(CryptoJS.enc.Utf8);
    // this.userData = JSON.parse(tempData)
    // const tempData = localStorage.getItem('userData')
    // this.userData = JSON.parse(tempData)
    // console.log(this.userData)


    this.dashboardService.questionList(this.temp).subscribe((data: any) => {
      this.spinner.hide()
      if (data.status.code === "00") {
        this.total = data.result.totalcount
        this.questionList = data.result.data
      } else {
        alert('Something went wrong!')
      }
    })
  }

  tagChange(event) {
    this.spinner.show()
    this.p = 1
    this.temp = {
      f_page_number: 1,
      f_page_size: 3,
      f_tag_id: (+event.target.value === 5 ? null : +event.target.value)
    }
    this.tag = +event.target.value
    this.dashboardService.questionList(this.temp).subscribe((data: any) => {
      this.spinner.hide()
      if (data.status.code === "00") {
        //console.log(data)
        this.questionList = data.result.data
        this.total = data.result.totalcount
      } else {
        alert('Something went wrong!')
      }
    })
  }

  async getPage(page: number) {
    this.spinner.show()
    this.p = page
    this.temp = {
      f_page_number: page,
      f_page_size: 3,
      f_tag_id: (this.tag === 5 ? null : this.tag)
    }
    this.dashboardService.questionList(this.temp).subscribe((data: any) => {
      this.spinner.hide()
      console.log(data)
      if (data.status.code === "00") {
        this.questionList = data.result.data
        console.log(this.questionList)
      } else {
        alert('Something went wrong!')
      }
    })  
  }

}
