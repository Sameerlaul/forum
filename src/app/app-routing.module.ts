import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'onboarding',
    loadChildren: './modules/onboarding/onboarding.module#OnboardingModule'
  },
  {
    path: '',
    loadChildren: './modules/dasshboard/dasshboard.module#DasshboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
