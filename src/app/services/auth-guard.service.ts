import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthService, private router: Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                let isAuthenticated = !!user;
                if(isAuthenticated){
                    return true;
                }
                else{
                    return false;
                }
            }),
            tap(
                isAuthenticated =>{
                    if(!isAuthenticated){
                        // console.log('hello')
                        this.router.navigate(['/auth']);
                    }
                }
            )
        );
    }

}