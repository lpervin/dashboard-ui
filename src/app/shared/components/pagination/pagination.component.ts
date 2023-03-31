import { Component, ViewChild, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { timeout } from 'rxjs';
import { PagerViewModel } from '../../models/APIs';

@Component({
  selector: 'ui-dashboard-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef;

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
    this.scrollBottom();
    this.GotoPageSelected.emit(page);
    return false;
}

NextPage(){
  this.scrollBottom();  
  this.NextPageSelected.emit();
  return false;
}


PrevPage(){
    this.scrollBottom();
    this.PrevPageSelected.emit();
    return false;
}

NextPageRange()
{
  this.scrollBottom();
  this.NextPageRangeSelected.emit();
  return false;
}


PrevPageRange()
{
    this.scrollBottom();
    this.PrevPageRangeSelected.emit();
    return false;
}


scrollBottom(){
  
  setTimeout(() => {
    var scrollElem= document.querySelector('#page-scroll');
    if (scrollElem==null) return;
    scrollElem.scrollIntoView(); 
  }, 200);
 
  
  
}

}
