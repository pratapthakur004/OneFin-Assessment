import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem("backColor")) {
      document.documentElement.style.setProperty("--background-color", localStorage.getItem("backColor") == "white" ? "#fff" : "#343a40")
      document.documentElement.style.setProperty("--toggle-color", localStorage.getItem("backColor") == "white" ? "#343a40" : "#fff")
    }
  }
}
