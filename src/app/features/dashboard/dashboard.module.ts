import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const dashboardRoutes: Routes = [
    {path: "", component: DashboardComponent}
];

@NgModule({
    imports: [
          RouterModule.forChild(dashboardRoutes),       
          CommonModule
        ],
    declarations: [
      DashboardComponent     
    ]   
  })
  export class DashboardModule { }