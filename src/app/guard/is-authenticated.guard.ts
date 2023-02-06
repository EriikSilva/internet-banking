import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";


@Injectable({
    providedIn:'root'
})

export class IsAuthenticatedGuard implements CanActivate{

    constructor(
        private authService:AuthService,
        private router:Router
        ){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
         
       return this.authService.isLoggedIn$
        .pipe(
            tap(isLoggedIn => {
                //redirecionar
                if(!isLoggedIn){
                    this.router.navigate([''])
                }
            })
        )

    }

}