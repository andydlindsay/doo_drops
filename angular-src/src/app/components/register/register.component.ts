import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private uservalidateService: UservalidateService, private flashMessagesService: FlashMessagesService, private fb: FormBuilder) {
  }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'name': [this.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(55)
      ]],
      'username': [this.username, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]],
      'email': [this.email, [
        Validators.required
      ]],
      'password': [this.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]]
    });

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  onValueChanged(data?: any) {
    if (!this.registerForm) { return; }
    const form = this.registerForm;

    for (const field in this.formErrors) {
      // clear previous error message if any
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'username': '',
    'email': '',
    'password': ''
  }

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 55 characters long.'
    },
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 8 characters long.',
      'maxlength': 'Username cannot be more than 25 characters long.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    }
  }

  onRegisterSubmit() {
    // create a user object to hold form values
    const newUser = this.registerForm.value;

    // validate email field
    if (!this.uservalidateService.validateEmail(newUser.email)) {
      this.flashMessagesService.show('Please enter a valid email address', { timeout: 3000 });
      return false;
    }

    // submit user to database
    console.log('GTG');
  }

}
