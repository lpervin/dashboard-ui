import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../models/menu.model'
import { MenuService } from 'src/app/shared/services/menu.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'ui-dashboard-nav-menu-mobile',
  templateUrl: './nav-menu-mobile.component.html',
  styleUrls: ['./nav-menu-mobile.component.css']
})
export class NavMenuMobileComponent implements OnInit {
  navMenu$: Observable<Menu[]>;

  constructor(private menuService: MenuService) { }


  ngOnInit(): void {
    this.navMenu$ = this.menuService.getMenuData();

  }

}
