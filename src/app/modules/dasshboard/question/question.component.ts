import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  param;
  quesId;
  userData
  answerList = []
  ansForm: FormGroup;
  quesData;
  status
  constructor(private route: ActivatedRoute, private dashboardService: DashboardService,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.ansForm = new FormGroup({
      'answer': new FormControl(null, Validators.required)
    })
    // const tempData = localStorage.getItem('userData')
    // this.userData = JSON.parse(tempData)
    // console.log(this.userData)
    this.route.paramMap.subscribe(params => {
      this.param = params;
      this.quesId = +this.param.params.id;
      this.status = +this.param.params.status
    });
    this.spinner.show()
    this.dashboardService.quesAnswer({ que_id: this.quesId }).subscribe((data: any) => {
      this.spinner.hide();
      if (data.status.code == "00") {
        this.quesData = data.result
        if (data.result.replies_count > 0) {
          this.answerList = data.result.answer_info
        }
      }
      else {
        alert('Something went wrong')
      }
    })
  }

  onSubmit() {
    this.spinner.show()
    const tempData = localStorage.getItem('userData')
    if (tempData) {
      this.userData = JSON.parse(tempData)
      console.log(this.userData)
      let tempObj = {
        ...this.ansForm.value,
        que_id: this.quesId,
        user_id: this.userData.id
      }
      this.dashboardService.submitAnswer(tempObj, this.userData.token).subscribe((data: any) => {
        this.spinner.hide()
        if (data.status.code == "00") {
          this.ngOnInit()
        }
        else{
          alert("Something went wrong.")
        }
      })
    }
    else {
      alert("You need to login first.")
      this.spinner.hide()
      this.router.navigateByUrl('/onboarding')
    }
  }

  onApprove(ans_id){
    const tempData = localStorage.getItem('userData')
    this.userData = JSON.parse(tempData)
    console.log(this.userData)
    let temp = {
      ans_id: ans_id,
      user_id: this.userData.id
    }
    this.dashboardService.updateAnswersStatus(temp, this.userData.token).subscribe((data: any) => {
      if(data.status.code == "00"){
        this.ngOnInit()
      }
    })
  }

}
