import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from '../../../models/UsersModel';
import {  State } from '../../../state';
import { Router } from '@angular/router';
import { createUser } from '../../../state/actions/users-list-page.actions';

@Component({
  selector: 'ui-dashboard-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.css']
})
export class UserCreatePageComponent implements OnInit {


  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.router.navigate(['/users']);  
  }

  onSave(userData: UserModel){
      // console.log(userData);
      this.store.dispatch(createUser({newUser: userData}));
      this.router.navigate(['/users']);    
  }

}
