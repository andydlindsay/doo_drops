import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouterTestingModule } from '@angular/router/testing';


import { RegisterComponent } from './register.component';
import 'hammerjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ RegisterComponent ],
      providers: [
        FlashMessagesService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  describe('Name Field', () => {

    let errors;
    let name;

    beforeEach(() => {
      errors = {};
      name = component.registerForm.controls['name'];
      expect(name.valid).toBeFalsy();
    });

    it('should be a required field', () => {
      errors = name.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should be invalid if less than 4 characters', () => {
      name.setValue('nam');
      errors = name.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    });

    it('should be invalid if more than 55 characters', () => {
      let newName = '';
      while (newName.length < 60) {
        newName += 'nnnn';
      }
      name.setValue(newName);
      errors = name.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    });

    it('should be invalid if it contains any special characters', () => {
      name.setValue('?%^&*%$');
      errors = name.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
    });

    it('should accept a valid value', () => {
      name.setValue('John Smith');
      errors = name.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
      expect(errors['maxlength']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
    });

  });

  describe('Username Field', () => {

    let errors;
    let username;

    beforeEach(() => {
      errors = {};
      username = component.registerForm.controls['username'];
      expect(username.valid).toBeFalsy();
    });

    it('should be a required field', () => {
      errors = username.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should be invalid if less than 8 characters', () => {
      username.setValue('1234567');
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    });

    it('should be invalid if more than 25 characters', () => {
      let newUsername = '';
      while (newUsername.length < 30) {
        newUsername += 'nnnn';
      }
      username.setValue(newUsername);
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    });

    it('should be invalid if it contains any special characters', () => {
      username.setValue('?><&*^%');
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
    });

    it('should accept a valid value', () => {
      username.setValue('username');
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
      expect(errors['maxlength']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
    });

  });

  describe('Email Field', () => {

    let errors;
    let email;

    beforeEach(() => {
      errors = {};
      email = component.registerForm.controls['email'];
      expect(email.valid).toBeFalsy();
    });

    it('should be a required field', () => {
      errors = email.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should be invalid if not a valid email', () => {
      email.setValue("john@john");
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();
    });

    it('should accept a valid value', () => {
      email.setValue("john@john.com");
      errors = email.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
    });

  });

  describe('Password Field', () => {

    let errors;
    let password;

    beforeEach(() => {
      errors = {};
      password = component.registerForm.controls['password'];
      expect(password.valid).toBeFalsy();
    });

    it('should be a required field', () => {
      errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should be invalid if less than 8 characters', () => {
      password.setValue('1234567');
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    });

    it('should be invalid if more than 25 characters', () => {
      let newPassword = '';
      while (newPassword.length < 30) {
        newPassword += 'nnnn';
      }
      password.setValue(newPassword);
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    });

    it('should accept a valid value', () => {
      password.setValue('password');
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['minlength']).toBeFalsy();
      expect(errors['maxlength']).toBeFalsy();
    });

  });

});