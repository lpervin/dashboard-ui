
import { createSelector } from "@ngrx/store";
import * as fromUserList from "./user-list.reducer";
import { SortViewModel } from "src/app/shared/models/APIs";

export interface State {  
  users: fromUserList.UserListState;
}


export const selectUserListState = (state: State) => state.users;

export const selectUsersPageData = createSelector(selectUserListState,   
    fromUserList.selectAll
);

export const selectStateEntities = createSelector(selectUserListState, 
  fromUserList.selectEntities
  );


export const selectedUserData = createSelector(
        selectUserListState,
        selectStateEntities,
        (state, entities) =>  {         
          return state.selectedUserId ? entities[state.selectedUserId] : null;
        }
      );

export const selectLoadingStatus = createSelector(selectUserListState,
                        state => state.DataStatus
                  );

export const selectPaging = createSelector(selectUserListState,
            state => state.Paging
            );
    export const selectSort = createSelector(selectPaging,
      (state):SortViewModel => new SortViewModel(state.sortByName, state.orderBy)
          
      
      );

  export const selectErrorMessage = createSelector(selectUserListState, 
                                  state => state.ErrorMessage
                       );

// function SortViewModel(s1: PagerViewModel, s2: void, s3: unknown): unknown {
//   throw new Error("Function not implemented.");
// }
