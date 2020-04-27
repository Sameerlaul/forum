import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddQuesComponent } from './add-ques/add-ques.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'add-ques',
    component: AddQuesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasshboardRoutingModule { }
