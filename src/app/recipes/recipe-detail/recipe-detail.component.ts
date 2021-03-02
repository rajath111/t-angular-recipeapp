import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shoppinglist.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService, private slService: ShoppingListService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params)=>{
      this.id = +params["id"];
      this.selectedRecipe = this.recipeService.getRecipe(this.id);
    })
  }

  // onClickTest(){
  //   console.log('test clicked')
  // }
  onClickAddToCart(){
    this.slService.addIngredients(this.selectedRecipe.ingredients);
  }

  deleteRecipe(index: number){
    this.recipeService.deleteRecipe(index);
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
