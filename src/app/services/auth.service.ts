import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap, } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { User } from "../auth/auth.model";

interface AuthResponseModel{
    idToken:	string;
    email:	string;	
    refreshToken:	string;
    expiresIn:	string;	
    localId:	string;
    registered: true;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    user = new BehaviorSubject<User>(null);
    private logoutTimer;

    constructor(private httpClient: HttpClient, private router: Router){

    }
    
    signUp(email: string, password: string){
        return this.httpClient.post<AuthResponseModel>(environment.authSignUpUrl, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                const expirationDate = new Date(new Date().getTime()+ +responseData.expiresIn * 1000);
                this.automaticLogout(+responseData.expiresIn * 1000);
                const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
                this.user.next(user);
            }) 
        );
    }

    signIn(email: string, password: string){
        return this.httpClient.post<AuthResponseModel>(environment.authSignInUrl,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                const expirationDate = new Date(new Date().getTime()+ +responseData.expiresIn * 1000);
                this.automaticLogout(+responseData.expiresIn * 1000);
                const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
                this.user.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
            })
        )
    }
    automaticLogin(){
        const userData: {email: string, id: string, _experationDate: string, _token: string} = JSON.parse(localStorage.getItem('userData'));
        // console.log(userData);
        if(userData){
            if(new Date(userData._experationDate) > new Date()){
                console.log("Time left is : ");
                console.log((new Date(userData._experationDate).getTime() - new Date().getTime())/1000/60);
                const user = new User(userData.email, userData.id, userData._token, new Date(userData._experationDate));
                this.user.next(user);
                this.automaticLogout(new Date(userData._experationDate).getTime() - new Date().getTime());
                this.router.navigate(['/recipes']);
            }
        }
    }


    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        clearTimeout(this.logoutTimer);
    }
    automaticLogout(timeleft: number){
        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, timeleft);
    }

    

    

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'An Error Occured.';
                
        if(!errorResponse.error && !errorResponse.error.error){
            return throwError(errorMessage);
        }
        errorMessage = <string>errorResponse.error.error.errors[0].message;
        return throwError(errorMessage);
    }

    private handleUser(responseData: AuthResponseModel){
        const expirationDate = new Date(new Date().getTime()+ +responseData.expiresIn * 1000);
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
        this.user.next(user);
    }

}