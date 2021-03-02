import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/datastore.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  constructor(private dataStoreService: DataStoreService){}
  ngOnInit(): void {
    // console.log('recipes started')
    this.dataStoreService.fetchRecipesFromServer();
    this.dataStoreService.onRecipesFetchedFromServer.subscribe(
      data => {
        
      }
    );
    this.dataStoreService.onRecipesSavedOnServer.subscribe(
      data => {
      }
    )
  }
  

}
