import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { DataStoreService } from "../services/datastore.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

    constructor(private dataStoreService: DataStoreService, 
        private authService: AuthService){
    }

    isLoggedIn: boolean = false;

    ngOnInit(){
        // this.authService.onLoggedIn.subscribe(value => {
        //     if(value){
        //         this.isLoggedIn = true;
        //     }
        // });
        // this.authService.onLoggedOut.subscribe(value =>{
        //     this.isLoggedIn = false;
        // })

        this.authService.user.subscribe(user => {
            if(user){
                this.isLoggedIn = true;
            }
            else{
                this.isLoggedIn = false;
            }
        })
    }

    fetchData(){
        this.dataStoreService.fetchRecipesFromServer();
    }

    saveData(){
        this.dataStoreService.saveRecipesOnServer();
    }

    logout(){
        this.authService.logout();
    }

}

