export class SortViewModel {
  
    constructor( sortByName: string,  orderBy: string) {
       this.sortByName = sortByName;
       this.orderBy = orderBy;
        
    }
    sortByName: string;
    orderBy: string;
}