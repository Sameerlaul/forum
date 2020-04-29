import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasshboardRoutingModule } from './dasshboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule} from 'ngx-spinner';
import { QuestionComponent } from './question/question.component';
import { NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [HomeComponent, AddQuesComponent, QuestionComponent],
  imports: [
    CommonModule,
    DasshboardRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DasshboardModule { }
