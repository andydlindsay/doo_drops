import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UservalidateService } from '../../services/uservalidate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private uservalidateService: UservalidateService, private fb: FormBuilder) {
  }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(55)
      ]],
      'username': ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25)
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
    // create a user object to hold form values
    const newUser = this.registerForm.value;

    // submit user to database
    console.log('GTG');
  }

}
