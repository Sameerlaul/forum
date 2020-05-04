import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

    constructor(private router: Router){}
    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        let user = localStorage.getItem('userData')
        if(user){
            return true
        }
        else{
            return this.router.createUrlTree(['/onboarding'])
        }
    }
}