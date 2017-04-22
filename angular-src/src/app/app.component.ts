import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Doo Drops';
  isDarkTheme: boolean = true;

  constructor(
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

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
