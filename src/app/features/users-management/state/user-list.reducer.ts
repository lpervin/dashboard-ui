import { PagerViewModel } from "src/app/shared/models/APIs";

import { createReducer, createSelector, on } from '@ngrx/store';

import { UserListPagingActions, SelectUserForEdit, updateUser } from "./actions/users-list-page.actions";
import { UsersApiActions } from "./actions/users-api.actions";
import { UserModel } from "../models/UsersModel";
import { createEntityAdapter, EntityState } from "@ngrx/entity";




export interface UserListState extends EntityState<UserModel> {
    Paging: PagerViewModel;
    DataStatus: string | 'loading' | 'success' | 'error';
    ErrorMessage: string | null;
    selectedUserId: string | null;    
}

export const adapter = createEntityAdapter<UserModel>();

//initial state
export const initialState: UserListState = adapter.getInitialState(
    {
        selectedUserId: null,
        DataStatus:  'loading' ,
        ErrorMessage: null,
        Paging: { currentPageNumber: 1, 
                    pageSize: 5,
                    sortByName: 'Id',
                    orderBy: 'asc',
                    numberOfpages: 0, 
                    VisiablePageRanges: [],
                    AvailabelPages: [],
                    NextPageRangeAvailable: false,
                    PreviousPageRangeAvailable: false,
                    PagesRangeSize: 5      
                }
         
    
    }
);

export const usersListReducer = createReducer<UserListState>(initialState,
    on(UserListPagingActions.init, (state) : UserListState => {    
            //console.log(state) ;
            return {             
                ...state,
                 DataStatus: 'loading'}
    } ),
    on(UserListPagingActions.orderby, (state, {orderByFieldName}): UserListState => {
        let orderBy:string='Asc';
        if (state.Paging.sortByName===orderByFieldName)
            orderBy = state.Paging.orderBy == 'Asc' ? 'Desc' : 'Asc';
        const page = 1;    //Go to page 1
        const currentRange = calcPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize, state.Paging.numberOfpages, page);
        return {...state, DataStatus: 'loading',
        Paging: {...state.Paging,
            VisiablePageRanges: currentRange,
            currentPageNumber: page,
            PreviousPageRangeAvailable: false,
            NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages,
            orderBy,
            sortByName: orderByFieldName
            
        }
    }
    }),
    on(UserListPagingActions.gotopage, (state, {page}) : UserListState => {
        
        if (page<=0 || page>state.Paging.numberOfpages)
            return state;
        const currentRange = calcPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize, state.Paging.numberOfpages, page);
        return {...state,
                DataStatus: 'loading', 
                Paging: {
                    ...state.Paging,                     
                    VisiablePageRanges: currentRange,
                    currentPageNumber: page,
                    PreviousPageRangeAvailable: currentRange[0]!=1,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
        }
    } ),
    on(UserListPagingActions.nextpage, (state) : UserListState => {
        if (state.Paging.currentPageNumber===state.Paging.numberOfpages)
            return state;
        let page:number = state.Paging.currentPageNumber;
        let nextPage = ++page;
        
        let currentRange = nextPage>state.Paging.VisiablePageRanges[state.Paging.VisiablePageRanges.length-1] ? 
                    CalcNextPageRange(state.Paging.VisiablePageRanges, state.Paging.numberOfpages, state.Paging.PagesRangeSize)
                    :
                    state.Paging.VisiablePageRanges;

        return {...state,
                DataStatus: 'loading', 
                Paging: {...state.Paging, 
                    currentPageNumber: nextPage,
                    VisiablePageRanges: currentRange,
                    PreviousPageRangeAvailable: currentRange[0]!=1,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
        }
    } ),
    on(UserListPagingActions.previouspage, (state) : UserListState => {
        if (state.Paging.currentPageNumber==1)
            return state;
            let page:number = state.Paging.currentPageNumber;
            let prevPage = --page;

            let currentRange = prevPage<state.Paging.VisiablePageRanges[0] ? 
            CalcPrevPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize)
            :
            state.Paging.VisiablePageRanges;

        return {...state,
                DataStatus: 'loading', 
                Paging: {...state.Paging, 
                    currentPageNumber: prevPage,
                    VisiablePageRanges: currentRange,
                    PreviousPageRangeAvailable: currentRange[0]!=1,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
        }
    } ),
    on(UserListPagingActions.nextpagerange, (state) => {
        let currentRange = CalcNextPageRange(state.Paging.VisiablePageRanges, state.Paging.numberOfpages, state.Paging.PagesRangeSize);
            return {                
                ...state,
                DataStatus: 'loading',
                 Paging: {...state.Paging,
                    currentPageNumber: currentRange[0],
                    VisiablePageRanges: currentRange,
                    PreviousPageRangeAvailable: true,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
            }
    } ),
    on(UserListPagingActions.prevpagerange, (state) => {
        let currentRange = CalcPrevPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize);
        return {
            ...state,
            DataStatus: 'loading',
             Paging: {...state.Paging,
                currentPageNumber: currentRange[currentRange.length-1],
                VisiablePageRanges: currentRange,
                PreviousPageRangeAvailable: currentRange[0]!=1,
                NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
            }
        }
    }),
    on(UsersApiActions.datainit, (state, {response}): UserListState => {
        const currentRange = state.Paging && state.Paging.VisiablePageRanges.length>0 ?         
                 state.Paging.VisiablePageRanges 
                        :        
                 Array.from(Array(Math.min(response.pagesCount, state.Paging.PagesRangeSize)).keys()).map(i => ++i);
        
                return  adapter.setAll(response.results, {...state,
                                                            DataStatus: 'success',
                                                            ErrorMessage: null,
                                                            Paging: {
                                                                    ...state.Paging,                        
                                                                    currentPageNumber: response.currentPageNumber,
                                                                    pageSize: response.pageSize,
                                                                    numberOfpages: response.pagesCount,
                                                                    AvailabelPages: Array.from(Array(response.pagesCount).keys()).map(i=>i+1),
                                                                    VisiablePageRanges: currentRange,
                                                                    PreviousPageRangeAvailable: currentRange[0]!=1,
                                                                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=response.pagesCount
                                                            }
        });
    }),
    on(UsersApiActions.pageddataloaded, (state, { response} ): UserListState => {
        return adapter.setAll(response.results, {...state,
                                                     DataStatus: 'success',   });
        
    }),  
    on(updateUser, (state,action) => {
        return {...state, DataStatus: 'loading'}
    }),
    on(UsersApiActions.userupdated, (state, action)=> {
           return adapter.updateOne({id: action.user.id, changes: action.user},
                        {
                            ...state,
                            selectedUserId: null
                        }
            ); 
    }), 
    on (UsersApiActions.userdeleted, (state, action) => {
        return adapter.removeOne(action.user.id, state);
    }),
    on(UsersApiActions.usercreated, (state, {pageResponeWtUser})=> {
        return adapter.setAll(pageResponeWtUser.results, 
            {...state,
            Paging: {...state.Paging, currentPage: 1},
            DataStatus: 'success',   });
        // return adapter.addOne(action.newUser, {...state, 
        //     selectedUserId: null,
        //     Paging: {...state.Paging, currentPage: 1}
        // });
    }),
    on(SelectUserForEdit, (state, {userId}): UserListState => {
        return {...state, selectedUserId: userId}
    }),
    on(UsersApiActions.apifailure, (state, {error}): UserListState => {
       return {...state,
            DataStatus: 'error',
            ErrorMessage: error.message
        };
    })
    );
    //Users List selectors
    export const {selectAll, selectEntities } = adapter.getSelectors();    
    export const selectActiveUserId = (state: UserListState) => state.selectedUserId;
   // export const selectUsersPageData = createSelector(selectAll,  (users) => users);
    export const selectActiveUser = createSelector(
        selectEntities,
        selectActiveUserId,
        (usersEntities, activeUserId) => {
            return activeUserId ? usersEntities[activeUserId] : null;
        }
    );
    //

const calcPageRange = (currentRange: number[], pagesRangeSize:number, numberOfpages:number, currentPage:number):number[] => {
    let upperBound = currentRange[currentRange.length-1];
    let lowerBound = currentRange[0];

    if (currentPage>=lowerBound && currentPage<=upperBound)
        return currentRange;
     
     const rangeNum = Math.ceil(currentPage/pagesRangeSize);
     upperBound = Math.min(rangeNum * pagesRangeSize, numberOfpages);
     lowerBound = upperBound - (pagesRangeSize-1);
     const range = [];
     for (let i = lowerBound;i<=upperBound;i++)
         range.push(i);
     
     return range;

};

 const CalcNextPageRange = (currentRange: number[], numberOfpages: number, pagesRangeSize:number): number[]  => {
   
        const nextRangeStart = currentRange[currentRange.length-1]+1;
        const nextRangeEnd = Math.min(numberOfpages, nextRangeStart+pagesRangeSize-1);
        const range = [];
        for (let i = nextRangeStart;i<=nextRangeEnd;i++)
            range.push(i);

        return range;
}


const CalcPrevPageRange = (currentRange: number[], pagesRangeSize: number): number[]  => {
   
    const prevRangeStart = Math.max(1, (currentRange[0])-pagesRangeSize);
    const prevRangeEnd = (prevRangeStart+pagesRangeSize)-1;
    const range = [];
    for (let i = prevRangeStart;i<=prevRangeEnd;i++)
        range.push(i);
    return range;
}