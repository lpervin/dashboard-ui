import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './components/users-list/users-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { usersListReducer } from './state/user-list.reducer';
import { UsersApiEffects } from './state/users-api-effects';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { UserUpdatePageComponent } from './components/user-crud/user-update-page/user-update-page.component';
import { UserFormComponent } from './components/user-crud/user-form/user-form.component';
import { UserCreatePageComponent } from './components/user-crud/user-create-page/user-create-page.component';
const usersRoutes: Routes = [
  {   path: 'users',  component: UsersListComponent },
  {   path: 'users/create',  component: UserCreatePageComponent, pathMatch: 'full'},
  {   path: 'users/:id', component: UserUpdatePageComponent },
  
];

@NgModule({  
  imports: [
    RouterModule.forChild(usersRoutes),
    StoreModule.forFeature('users', usersListReducer),
    EffectsModule.forFeature([UsersApiEffects]),    
    FormsModule, ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    UsersListComponent,
    PaginationComponent,
    UserUpdatePageComponent,
    UserFormComponent,
    UserCreatePageComponent
  ]
})
export class UsersManagementModule { }
