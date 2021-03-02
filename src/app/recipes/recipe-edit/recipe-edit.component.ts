import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private reciprService: RecipeService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
  
  editEnabled: boolean = false;
  selectedRecipeId: number;
  public recipeForm: FormGroup;
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) =>{
        let id = params['id'];
        if(id){
          this.selectedRecipeId = id;
          this.editEnabled = true;
        }
        else{
          this.editEnabled = false;
        }
        this.initForm();
      }
    )
  }

  initForm(){
    let name = '';
    let photoPath = '';
    let description = '';
    let formsArray: FormArray = new FormArray([]);
    if(this.editEnabled){
      const recipe: Recipe = this.reciprService.getRecipe(this.selectedRecipeId);
      name = recipe.name;
      photoPath = recipe.photoPath;
      description = recipe.description;
      for(let ingre of recipe.ingredients){
        formsArray.push(new FormGroup({
          'name': new FormControl(ingre.name, Validators.required),
          'amount': new FormControl(ingre.amount, Validators.required)
        }));
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      photoPath: new FormControl(photoPath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: formsArray
    });
  }

  onSubmit(){
    // console.log(this.recipeForm);

    if(this.editEnabled){
      this.reciprService.updateRecipe(this.selectedRecipeId, this.recipeForm.value);
    }
    else{
      this.reciprService.addRecipe(this.recipeForm.value)
    }

    this.onCancel();
    
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    }));
  }

  onCancel(){
    this.editEnabled = false;
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  getIngredientsControlas(){
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }
}
