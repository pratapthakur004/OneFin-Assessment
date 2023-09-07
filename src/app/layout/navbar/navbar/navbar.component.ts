import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoginOut: any;

  constructor(private authSer: AuthService) { }
  ngOnInit(): void {
    this.authSer.isLoginOut.subscribe(res => {
      this.isLoginOut = res;
    })
    if (localStorage.getItem('_token')) {
      this.authSer.isLoginOut.next(true)
    }
  }

  signout() {
    if (confirm("Do you want to logout")) {
      this.authSer.isLoginOut.next(false)
      this.authSer.logout();
    }
  }

}
