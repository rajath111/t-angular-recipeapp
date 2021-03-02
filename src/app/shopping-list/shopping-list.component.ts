import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from '../services/shoppinglist.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  public ingredients: Ingredient[];

  constructor(private slService: ShoppingListService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.slService.onIngredientAdded.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    )
  }
  
  onClickIngredient(index: number){
    // this.router.navigate(['edit', index], {relativeTo: this.route});
    this.slService.onIngredientSelected.next(index);
  }

}
