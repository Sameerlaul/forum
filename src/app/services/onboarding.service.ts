import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private api: ApiRequestService){}
  
  register(payload){
    console.log("check 1")
    return this.api.post('user/sign-up', payload)
  }

  verifyEmail(obj){
    return this.api.post('user/verify-email', obj)
  }

  login(payload){
    return this.api.post('user/sign-in', payload)
  }

  forgotPassword(payload){
    return this.api.post('user/forgot-password', payload)
  }

  resetPassword(payload){
    return this.api.post('user/reset-password', payload)
  }
}
