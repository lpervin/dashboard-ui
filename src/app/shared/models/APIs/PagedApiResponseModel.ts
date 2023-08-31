export interface PagedApiResponseModel {
    totalRecordsCount: number;
    pageSize: number;
    pageRecordsCount: number;  
    pagesCount: number;
    currentPageNumber: number;
    //orderBy: SortInfoModel;
}

export interface SortInfoModel {
    orderBy: string;
    orderDirection: string;
}