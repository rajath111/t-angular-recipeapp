import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipePlaceholderComponent } from "./recipes/recipe-placeholder/recipe-placeholder.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { SharedModule } from "./shared.module";
import { ShowDropdown } from "./shared/showDropdown.directive";

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        RecipePlaceholderComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: RecipesComponent, canActivate: [AuthGuardService] , children: [
                {path: '', component: RecipePlaceholderComponent},
                {path: 'edit', component: RecipeEditComponent},
                {path: ':id/edit', component: RecipeEditComponent},
                {path: ':id', component: RecipeDetailComponent},  
            ]},
        ])
    ]
})
export class RecipesModule{

}