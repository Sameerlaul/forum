import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  readonly ROOT_URL;
  constructor( private http: HttpClient) {
    this.ROOT_URL = 'http://52.172.133.91:5545/api/v1.0'
  }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  post(uri: string, payload){
    //console.log("check 2")
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

  postwttoken(uri: string, payload, token){
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': token
      })
    })
  }
}
