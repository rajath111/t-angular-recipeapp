import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { RecipeService } from "./recipe.service";
import { environment } from '../../environments/environment';
import { Recipe } from "../recipes/recipe.model";
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStoreService{
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    onRecipesSavedOnServer = new Subject<boolean>();
    onRecipesFetchedFromServer = new Subject<boolean>();

    saveRecipesOnServer(){
        this.httpClient.put(`${environment.baseUrl}recipes.json`, this.recipeService.getRecipes())
        .subscribe(
            data =>{
                if(data){
                    this.onRecipesSavedOnServer.next(true);
                }
            }
        );
    }

    fetchRecipesFromServer(){

        this.authService.user.pipe(take(1)).subscribe(
            user => {
                if(true){
                    this.httpClient.get<Recipe[]>(`${environment.baseUrl}recipes.json`)
                    .pipe(map(
                        data => {
                            if(data){
                                for(let recipe of data){
                                    recipe.ingredients = recipe.ingredients ? recipe.ingredients : [];
                                }
                            }
                            return data;
                        }
                    ))
                    .subscribe(
                        data =>{
                            if(data){
                                this.recipeService.setRecipes(data);
                                this.onRecipesFetchedFromServer.next(true);
                            }
                        }
                    )
                }
            }
        )

    }
}