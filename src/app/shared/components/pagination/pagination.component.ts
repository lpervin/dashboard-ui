import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagerViewModel } from '../../models/APIs';

@Component({
  selector: 'ui-dashboard-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagerModel: PagerViewModel | undefined | null;
  @Output() GotoPageSelected = new EventEmitter<Number>();
  @Output() NextPageSelected = new EventEmitter<void>();
  @Output() PrevPageSelected = new EventEmitter<void>();
  @Output() NextPageRangeSelected = new EventEmitter<void>();
  @Output() PrevPageRangeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }


  goToPage(page: any){      
        
    this.GotoPageSelected.emit(page);
    return false;
}

NextPage(){
  this.NextPageSelected.emit();
  return false;
}


PrevPage(){
    this.PrevPageSelected.emit();
}

NextPageRange()
{
  this.NextPageRangeSelected.emit();
  return false;
}


PrevPageRange()
{
    this.PrevPageRangeSelected.emit();
    return false;
}

}
