import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
  }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.titleService.setTitle('Register - Doo Drops');
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(55),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/)
      ]],
      'username': ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]],
      'email': ['', [
        Validators.required,
        Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
      ]]
    });

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  // onValueChanged function taken from the Angular Cookbook's Form Validation section
  // https://angular.io/docs/ts/latest/cookbook/form-validation.html
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
      'maxlength': 'Name cannot be more than 55 characters long.',
      'pattern': 'Name cannot contain special characters.'
    },
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 8 characters long.',
      'maxlength': 'Username cannot be more than 25 characters long.',
      'pattern': 'Username cannot contain special characters or spaces.'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Please enter a valid email address.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      // create a user object to hold form values
      const newUser = this.registerForm.value;

      // submit user to database
      console.log('GTG');

      this.auth.registerUser(newUser).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('You have successfully registered! Please log in with your username and password.', { cssClass: 'alert-success', timeout: 5000 });
          this.router.navigate(['/login']);
        } else {
          if (data.errmsg.includes('E11000')) {
            this.flashMessage.show('A user with that username already exists. Please choose a different username.', { cssClass: 'alert-failure', timeout: 5000 });
          } else {
            this.flashMessage.show(data.msg, { cssClass: 'alert-failure', timeout: 5000 });
          }
        }
      });

    } else {
      console.log('Errors remain...');
    }
  }

}
