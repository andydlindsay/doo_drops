import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        FlashMessagesService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  describe('Username Field', () => {

    let errors;
    let username;

    beforeEach(() => {
      errors = {};
      username = component.loginForm.controls['username'];
      expect(username.valid).toBeFalsy();
    });

    it('should be a required field', () => {
      errors = username.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should accept a valid value', () => {
      username.setValue('username');
      errors = username.errors || {};
      expect(errors['required']).toBeFalsy();
    });

  });

  describe('Password Field', () => {

    let errors;
    let password;

    beforeEach(() => {
      errors = {};
      password = component.loginForm.controls['password'];
      expect(password.valid).toBeFalsy();
    });

    it('should be a required field', () => {
      errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should accept a valid value', () => {
      password.setValue('password');
      errors = password.errors || {};
      expect(errors['required']).toBeFalsy();
    });

  });

});
