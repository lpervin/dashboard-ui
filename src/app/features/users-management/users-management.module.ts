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
import { UserEditPageComponent } from './components/user-edit/user-edit-page/user-edit-page.component';
import { UserEditFormComponent } from './components/user-edit/user-edit-form/user-edit-form.component';
const usersRoutes: Routes = [
  {   path: 'users',  component: UsersListComponent },
  {   path: 'users/:id', component: UserEditPageComponent }
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
    UserEditPageComponent,
    UserEditFormComponent
  ]
})
export class UsersManagementModule { }
