import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService{
    // recipes: Recipe[] = [
    //     new Recipe(
    //         "Test recipe", 
    //         "Just a Test", 
    //         'https://thumbs.dreamstime.com/b/kitchen-table-recipe-book-utensils-blank-vintage-cooking-ingredients-top-view-copy-space-66667669.jpg',
    //         [
    //             new Ingredient('Apple', 2),
    //             new Ingredient('Pineapple', 5)
    //         ]
    //         ),
    //     new Recipe("Test Recipe 2",
    //       "Just another Test",
    //       'https://thumbs.dreamstime.com/b/kitchen-table-recipe-book-utensils-blank-vintage-cooking-ingredients-top-view-copy-space-66667669.jpg',
    //       [
    //             new Ingredient('Potato', 3),
    //             new Ingredient('Tomato', 4),
    //             new Ingredient('Beetroot', 2)
    //       ]
    //       )
    // ];

    recipes: Recipe[] = [];

    constructor(){
        console.log("Recipe Service Created...")
    }

    onRecipeSelected: EventEmitter<Number> = new EventEmitter<Number>();
    onRecipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.onRecipesChanged.next(this.recipes);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.onRecipesChanged.next(this.recipes);
    }

    updateRecipe(index: number, updatedRecipe){
        this.recipes[index] = updatedRecipe;
        this.onRecipesChanged.next(this.recipes);
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.onRecipesChanged.next(recipes);
    }
    
}