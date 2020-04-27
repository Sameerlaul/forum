import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasshboardRoutingModule } from './dasshboard-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddQuesComponent } from './add-ques/add-ques.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule} from 'ngx-spinner'

@NgModule({
  declarations: [HomeComponent, AddQuesComponent],
  imports: [
    CommonModule,
    DasshboardRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class DasshboardModule { }
