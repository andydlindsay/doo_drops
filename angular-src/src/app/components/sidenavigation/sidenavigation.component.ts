import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent implements OnInit {

  title: String = 'Doo Drops';
  isDarkTheme: Boolean = false;
  username: String;

  constructor(
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.loggedIn()) {
      let userInfo = JSON.parse(localStorage.getItem('user'));
      this.username = userInfo.username;
    }
  }

  isLoggedIn() {
    return this.auth.loggedIn();
  }

  changeTheme(): void {
    if (this.isDarkTheme) {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme = true;
    }
  }

  onLogoutClick() {
    this.auth.logout();
    this.flashMessage.show('Logged out!', { cssClass: 'alert-success' });
    this.router.navigate(['/']);
  }

}
