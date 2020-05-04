import { Component, OnInit } from '@angular/core';
import { OnboardingService } from 'src/app/services/onboarding.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = false
  constructor(private onboardingService: OnboardingService, private router: Router) { }

  ngOnInit() {
    this.user =false 
    this.onboardingService.onUpdateNav().subscribe(data => {
      console.log("ok")
      this.user = data
    })
  }

  logout(){
    localStorage.clear();
    this.onboardingService.updateNav(false)
    this.router.navigateByUrl('/')
  }

}
