import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from 'src/app/services/shoppinglist.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('f') ingredientsForm: NgForm;
  
  selectedId: number;
  selectedIngredient: Ingredient;
  editEnabled: boolean =  false;


  constructor(private slService: ShoppingListService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.slService.onIngredientSelected.subscribe(
      (index) =>{
        this.selectedId = index;
        this.editEnabled = true;
        this.selectedIngredient = this.slService.getIngredient(index);
        this.ingredientsForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        })
      }
    )
  }

  onSubmit(){
    const ing: Ingredient = new Ingredient(this.ingredientsForm.value['name'], this.ingredientsForm.value['amount']);
    if(this.editEnabled){
      this.slService.updateIngredient(this.selectedId, ing);
    }else{
      this.slService.addIngredient(ing);
    }
    this.onClear();
  }

  onClear(){
    this.editEnabled = false;
    this.ingredientsForm.reset();
    
  }

  onDelete(){
    this.slService.delateIngredient(this.selectedId);
    this.onClear();
  }


}
