import { Component, OnInit } from '@angular/core';
import { UservalidateService } from '../../services/uservalidate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  error: Object;

  constructor(private uservalidateService: UservalidateService, private flashMessagesService: FlashMessagesService) {
    this.email = "";
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    // create a user object to hold form values
    const newUser = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // if validation fails, there should be one flash message indicating the type of validation failure (missing field, invalid value) and the offending field(s) should be highlighted in red and a note nearby with specific message (e.g. username is too short, it must be at least 8 characters)

    // required fields
    if (!this.uservalidateService.validateRegister(newUser)) {
      this.flashMessagesService.show('Please fill in all fields', { timeout: 3000 });
      return false;
    }

    // validate email field
    if (!this.uservalidateService.validateEmail(newUser.email)) {
      this.flashMessagesService.show('Please enter a valid email address', { timeout: 3000 });
      return false;
    }

    // submit user to database
    console.log('GTG');
  }

}
