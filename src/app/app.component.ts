import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Dashboard UI";
  links = [
   // { path: "/books", icon: "book", label: "Manage Products" },
    { path: "/users", icon: "people", label: "Manage Users" },
];
}
