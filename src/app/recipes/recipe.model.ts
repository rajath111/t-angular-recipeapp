import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name: string;
    public description: string;
    public photoPath: string;
    public ingredients: Ingredient[];

    constructor(name: string, desc: string, photoPath: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.photoPath = photoPath;
        this.ingredients = ingredients;
    }
}