import {  emptyProps, createActionGroup, props, createAction } from "@ngrx/store";
import { UserModel, UserRequiredProps } from "../../models/UsersModel";
import { SortViewModel } from "src/app/shared/models/APIs";


export const UserListPagingActions = createActionGroup({
        source: 'UserList Paging',
        events: {
            'Init': emptyProps(),
            'OrderBy': props<{orderByFieldName: string}>(),
            'GotoPage': props<{page: number}>(),
            'NextPage': emptyProps(),
            'PreviousPage': emptyProps(),
            'NextPageRange':emptyProps(),
            'PrevPageRange':emptyProps()
         }
});
export const SelectUserForEdit = createAction('[User-edit page] SelectUser', props<{userId:string}>());
export const deleteUser = createAction('[UserList page] Delete User',props<{userToDelete:UserModel}>());
export const updateUser = createAction(
    "[User-edit page] Update User",
    props<{ userId: string; changes: UserRequiredProps }>()
  );
  export const createUser = createAction(
    "[User-edit page] Create User",
    props<{ newUser: UserModel }>()
  );