import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api: ApiRequestService) { }

  questionList(payload){
    return this.api.post('forum/question-list', payload)
  }

  submitQuestion(payload, token){
    return this.api.postwttoken('forum/submit-question', payload, token)
  }

  quesAnswer(payload){
    return this.api.post('forum/question-answers', payload)
  }

  submitAnswer(payload, token){
    return this.api.postwttoken('forum/submit-answer', payload, token)
  }

  updateAnswersStatus(payload, token){
    return this.api.postwttoken('forum/update-answers-status', payload, token)
  }
}
