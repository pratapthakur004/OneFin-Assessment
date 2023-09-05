import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  isToggleActive: boolean = false
  ngOnInit(): void {
    if (localStorage.getItem('backColor') == 'black') {
      this.isToggleActive = true;
    }
    else {
      this.isToggleActive = false;
    }
  }


  toggleback() {
    if (localStorage.getItem("backColor")) {
      document.documentElement.style.setProperty("--background-color", localStorage.getItem("backColor") == "white" ? "#343a40" : "#fff")
      document.documentElement.style.setProperty("--toggle-color", localStorage.getItem("backColor") == "white" ? "#fff" : "#343a40")
      localStorage.setItem("backColor", localStorage.getItem("backColor") == "white" ? "black" : "white")
    }
    else {
      localStorage.setItem("backColor", "white")
      document.documentElement.style.setProperty("--background-color", "#fff")
      document.documentElement.style.setProperty("--toggle-color", "#343a40")
    }
  }
}
