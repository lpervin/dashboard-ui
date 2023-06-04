import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../../models/menu.model'
import { MenuService } from 'src/app/shared/services/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ui-dashboard-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
 
 @Input() collapsed: boolean = false;
  navMenu$: Observable<Menu[]>;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.navMenu$ = this.menuService.getMenuData();
  }

}
