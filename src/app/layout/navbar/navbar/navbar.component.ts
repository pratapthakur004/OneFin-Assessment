import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoginOut:boolean = false;

  constructor(private authSer: AuthService) { }
  ngOnInit(): void {
    localStorage.getItem('_token') ? this.isLoginOut = true : this.isLoginOut = false;
  }

  signout() {
    if (confirm("Do you want to logout")) {
      this.authSer.logout();
    }
  }

}
