import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  loginForm: FormGroup

  ngOnInit(): void {
    this.titleService.setTitle('Login - Doo Drops');
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'username': ['', [
        Validators.required
      ]],
      'password': ['', [
        Validators.required
      ]]
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  // onValueChanged function taken from the Angular Cookbook's Form Validation section
  // https://angular.io/docs/ts/latest/cookbook/form-validation.html
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

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
    'username': '',
    'password': ''
  }

  validationMessages = {
    'username': {
      'required': 'Username is required.'
    },
    'password': {
      'required': 'Password is required.'
    }
  }

  onLoginSubmit() {
    // submit login info to database
    if (this.loginForm.valid) {
      console.log('GTG');
      const user = this.loginForm.value;

      this.auth.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Logged in!', { cssClass: 'alert-success' });
          this.auth.storeUserData(data.token, data.user);
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show(data.msg + '. Please try again.', { cssClass: 'alert-failure' });
        }
      });

    } else {
      console.log('Errors remain...');
    }
  }

}
