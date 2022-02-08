import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser() {
    this.user = JSON.parse(localStorage.getItem('User_Data'));
  }

  logOut() {
    this.auth.logOut();
  }

  logOutInvitado() {
    localStorage.removeItem('User_Data');
    this.router.navigate(['/login']);
  }
}
