import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService{
    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Tomato", 12),
        new Ingredient("Pine Apple", 2),
        new Ingredient("Orange", 5)
    ];

    onIngredientAdded = new EventEmitter<Ingredient[]>();
    onIngredientSelected = new Subject<number>();

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.onIngredientAdded.emit(this.ingredients.slice());
    }
    
    updateIngredient(index: number, updatedIngredient: Ingredient){
        this.ingredients[index] = updatedIngredient;
        this.onIngredientAdded.emit(this.ingredients.slice())
    }

    delateIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.onIngredientAdded.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }

    
}