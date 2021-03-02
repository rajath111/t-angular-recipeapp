import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./shared/alert/alert.component";
import { ShowDropdown } from "./shared/showDropdown.directive";

@NgModule({
    declarations: [
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        ShowDropdown
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        ShowDropdown
    ]
})
export class SharedModule{

}