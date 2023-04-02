import {  emptyProps, createActionGroup, props, createAction } from "@ngrx/store";
import { UserModel, UserRequiredProps } from "../../models/UsersModel";


export const UserListPagingActions = createActionGroup({
        source: 'UserList Paging',
        events: {
            'Init': emptyProps(),
            'GotoPage': props<{page: number}>(),
            'NextPage': emptyProps(),
            'PreviousPage': emptyProps(),
            'NextPageRange':emptyProps(),
            'PrevPageRange':emptyProps()
         }
});

export const SelectUserForEdit = createAction('[User-edit page] SelectUser', props<{userId:string}>());
export const updateUser = createAction(
    "[User-edit page] Update User",
    props<{ userId: string; changes: UserRequiredProps }>()
  );
  export const createUser = createAction(
    "[User-edit page] Create User",
    props<{ newUser: UserModel }>()
  );