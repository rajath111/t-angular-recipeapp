import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataStoreService } from './services/datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title="Course Project";

  isDataSavedSuccessfully = false;
  isDataLoadedSuccessfully = false;
  
  constructor(private dataStoreService: DataStoreService, private authService: AuthService){}
  ngOnInit(){
    this.authService.automaticLogin();
  }

  hideLoad(){
    this.isDataLoadedSuccessfully = false;
  }

  hideSave(){
    this.isDataSavedSuccessfully = false;
  }

}
