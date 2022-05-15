import { Component, OnInit } from "@angular/core";

@Component({
  selector: "exads-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var userLang = navigator.language;
    localStorage.setItem("language", userLang);
  }
}
