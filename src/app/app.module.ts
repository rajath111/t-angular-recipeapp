import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';
import { ShowDropdown } from './shared/showDropdown.directive';
import { ShoppingListService } from './services/shoppinglist.service';
import { AppRoutingModule } from 'src/app/app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './services/authentication-intecetptor.service';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ShoppingListService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
