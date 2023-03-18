import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserModel } from '../../../models/UsersModel';
import { selectedUserData, selectLoadingStatus, State } from '../../../state';
import { SelectUserForEdit, updateUser } from '../../../state/actions/users-list-page.actions';

@Component({
  selector: 'ui-dashboard-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css']
})
export class UserEditPageComponent implements OnInit {

        loadingStatu$!: Observable<string>;
        currentSelectedUserData$!: Observable<UserModel | null | undefined>;

        constructor(private route:ActivatedRoute, private router: Router, private store: Store<State>) { }
        userId!: string;
        ngOnInit(): void {
            const userId = this.route.snapshot.params["id"];
            this.store.dispatch(SelectUserForEdit({userId}))
            this.currentSelectedUserData$ = this.store.select(selectedUserData);
            this.loadingStatu$ = this.store.select(selectLoadingStatus); 
        }

        onCancel(){
          this.router.navigate(['/users']);  
        }

        onSave(userData: UserModel){
            // console.log(userData);
            this.store.dispatch(updateUser({userId: userData.id, changes: userData}));
            this.router.navigate(['/users']);    
        }
}
