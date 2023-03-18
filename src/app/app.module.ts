import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { MaterialModule } from "./material.module";
import {MatNativeDateModule} from '@angular/material/core';
import { AppComponent } from "./app.component";
import { UsersManagementModule } from "./features/users-management/users-management.module";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),/*reducers, { metaReducers } */
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),    
    MaterialModule,
    MatNativeDateModule,
    UsersManagementModule   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
