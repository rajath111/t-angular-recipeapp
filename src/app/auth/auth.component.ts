import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router){

    }

    onSubmit(form: NgForm){
        this.isLoading = true;
        this.error = null;
        console.log(form);
        const email = form.value.email;
        const password = form.value.password;
        if(!this.isLoginMode){            
            this.authService.signUp(email, password).subscribe(
                data => {
                    console.log(data);
                    this.isLoading = false;
                    this.router.navigate(['/recipes']);
                },
                errorMessage =>{
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            )
        }
        else{
            console.log('sending request form auth service')
            this.authService.signIn(email, password).subscribe(
                (result) =>{
                    console.log(result)
                    this.isLoading = false;
                    this.router.navigate(['/recipes']);
                },
                (errorMessage) =>{
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            )
        }        
    }

    onModeToggle(){
        this.isLoginMode = !this.isLoginMode;
    }

    onClose(){
        this.error = null;
    }
}