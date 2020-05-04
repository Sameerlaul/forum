import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { QuestionComponent } from './question/question.component';
import { AuthGaurd } from 'src/app/auth-gaurd';
import { MyQuestionComponent } from './my-question/my-question.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-ques',
    component: AddQuesComponent,
    canActivate : [AuthGaurd]
  },
  {
    path: 'ques/:id/:status',
    component: QuestionComponent
  },
  {
    path: 'my-question',
    component: MyQuestionComponent,
    canActivate : [AuthGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasshboardRoutingModule { }
