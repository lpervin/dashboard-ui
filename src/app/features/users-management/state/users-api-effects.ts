import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  Store } from "@ngrx/store";
import { catchError, exhaustMap,  map, of, switchMap, withLatestFrom, tap, concatMap } from "rxjs";
import { selectPaging, State } from ".";
import { UsersDataService } from "../services/users-data.service";
import { UsersApiActions } from "./actions/users-api.actions";
import { UserListPagingActions, createUser, updateUser, deleteUser } from "./actions/users-list-page.actions";
import { ApiPageRequest } from "src/app/shared/models/APIs";

@Injectable()
export class UsersApiEffects {

    constructor(private userDataService: UsersDataService, private actions$: Actions, private store: Store<State>){

    }

    initUserList$ = createEffect(() =>
    this.actions$.pipe(
        ofType(UserListPagingActions.init),
        withLatestFrom(this.store.select(selectPaging)),
        exhaustMap(([initAction, pagerVM]) =>        
                this.userDataService.page({
                            pageNumber: pagerVM.currentPageNumber,
                            pageSize: pagerVM.pageSize,
                            sortBy: pagerVM.sortByName,
                            sortDir: pagerVM.orderBy
                      })
                    .pipe(
                //   tap(r => console.log(r)),
                    map(apiRespModel => UsersApiActions.datainit({  response: apiRespModel }) ),
                    catchError(error => of(UsersApiActions.apifailure({error})))
                    )
            )
    )
    );
    
    loadUsersPage$ = createEffect(() =>
    this.actions$.pipe(     
            ofType(...[UserListPagingActions.gotopage,
                        UserListPagingActions.nextpage,
                        UserListPagingActions.previouspage,
                        UserListPagingActions.nextpagerange,
                        UserListPagingActions.prevpagerange,
                        UserListPagingActions.orderby

            ]),
            withLatestFrom(this.store.select(selectPaging)),
            switchMap(([pageAction, pagerVM])   => {
                return this.userDataService.page({
                    pageNumber: pagerVM.currentPageNumber,
                    pageSize: pagerVM.pageSize,
                    sortBy: pagerVM.sortByName,
                    sortDir: pagerVM.orderBy
                } as ApiPageRequest)
                    .pipe(
                        tap(r => console.log(r)),
                        map(apiRespModel => UsersApiActions.pageddataloaded({  response: apiRespModel }) ),
                        catchError(error => of(UsersApiActions.apifailure({error})))
                    )
                })
            )
            );
            updateUser$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(updateUser),
                    concatMap(action =>
                        this.userDataService.update(action.userId, action.changes)
                        .pipe(map(user => UsersApiActions.userupdated({user})))
                        )
                )
            );
            createUser$ = createEffect(() => 
                                this.actions$.pipe(
                                    ofType(createUser),
                                    withLatestFrom(this.store.select(selectPaging)),
                                    exhaustMap(([action, pagingVM]) =>
                                        this.userDataService.create(action.newUser)
                                       .pipe(
                                        map(pageResponeWtUser => UsersApiActions.usercreated({pageResponeWtUser}),
                                        catchError(error => of(UsersApiActions.apifailure({error}))
                                            )
                                        
                                        ))
                                        )
                                        )
                                    );
                deleteUser$ = createEffect(() =>
                                        this.actions$.pipe(
                                            ofType(deleteUser),
                                            concatMap((action) => this.userDataService.delete(action.userToDelete.id))
                                            ).pipe(
                                                map(action => UsersApiActions.userdeleted({ user: action})),
                                                catchError(error => of(UsersApiActions.apifailure({error})))
                                            
                                                )
                                        );
                                    
}

