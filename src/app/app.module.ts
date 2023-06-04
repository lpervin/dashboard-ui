import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "./app.component";
import { UsersManagementModule } from "./features/users-management/users-management.module";
import { AppRoutingModule } from "./app-routing.module";


import { NavMenuComponent } from './shared/components/navigation/nav-menu/nav-menu.component';
import { HeaderComponent } from './shared/components/dashboard/header/header.component';
import { FooterComponent } from './shared/components/dashboard/footer/footer.component';
import { NavMenuMobileComponent } from './shared/components/navigation/nav-menu-mobile/nav-menu-mobile.component';

@NgModule({
  declarations: [AppComponent, NavMenuComponent, HeaderComponent, FooterComponent, NavMenuMobileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),/*reducers, { metaReducers } */
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),    
    UsersManagementModule   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
