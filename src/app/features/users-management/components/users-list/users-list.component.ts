import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PagerViewModel, SortViewModel } from 'src/app/shared/models/APIs';
import { UserModel } from '../../models/UsersModel';
import { selectErrorMessage, selectLoadingStatus, selectPaging, selectSort, selectUserListState, selectUsersPageData, State } from '../../state';
import { UserListState } from '../../state/user-list.reducer';
import { Store } from '@ngrx/store';
import { UserListPagingActions, deleteUser } from '../../state/actions/users-list-page.actions';

@Component({
  selector: 'ngrx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 
  pagerViewModel$!: Observable<PagerViewModel>;
  sortViewModel$!: Observable<SortViewModel>;
  usersData$!: Observable<UserModel[]>;
  loadingStatu$!: Observable<string>;
  errorMessage$: Observable<string | null> | null | undefined;
  // userListState$!: Observable<UserListState> | null;
  
  constructor(private store: Store<State>) { }
  
  displayedColumns: string[] = ['name', 'email', 'age', 'actions'];

  ngOnInit(): void {

        this.store.dispatch(UserListPagingActions.init())
        // this.userListState$ = this.store.select(selectUserListState);
        this.pagerViewModel$ = this.store.select(selectPaging);
        this.sortViewModel$ = this.store.select(selectSort);
        this.usersData$ = this.store.select(selectUsersPageData);
        this.loadingStatu$ = this.store.select(selectLoadingStatus);
        this.errorMessage$ = this.store.select(selectErrorMessage);      
  }


  goToPage(page: any){        
    this.store.dispatch(UserListPagingActions.gotopage({ page }));
}

NextPage(){
  this.store.dispatch(UserListPagingActions.nextpage());
}


PrevPage(){
    this.store.dispatch(UserListPagingActions.previouspage());
}

NextPageRange()
{
  this.store.dispatch(UserListPagingActions.nextpagerange());
}


PrevPageRange()
{
  this.store.dispatch(UserListPagingActions.prevpagerange());
}
sortByChanged(fieldName: string){
    this.store.dispatch(UserListPagingActions.orderby({orderByFieldName: fieldName}));
}
deleteUser(user: UserModel) {
    if (confirm('Are you sure you want to delete this user?')) {
        //alert('Will you delete this user ' + user.id );
        this.store.dispatch(
            deleteUser({ userToDelete: user })
        );
    }
}

}
