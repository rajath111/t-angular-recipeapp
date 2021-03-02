import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

import {} from './shopping-list.module'

const routes: Routes = [
    {path: '', redirectTo:'/auth', pathMatch:'full'},
    {path: 'auth', component: AuthComponent},
    {path:'recipes', loadChildren: () => import('./recipes.module').then(m => m.RecipesModule) },
    {path:'shopping-list', loadChildren: () => import('./shopping-list.module').then(m => m.ShoppingListModule)},
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}