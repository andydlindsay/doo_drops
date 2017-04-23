import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dogform',
  templateUrl: './dogform.component.html',
  styleUrls: ['./dogform.component.scss']
})
export class DogformComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private titleService: Title,
    private router: Router
  ) { }

  dogForm: FormGroup;

  ngOnInit() {
    this.titleService.setTitle('Add Dog - Doo Drops');
    this.buildForm();
  }

  buildForm(): void {
    this.dogForm = this.fb.group({
      'name': ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]],
      'dob': [''],
      'image': [''],
      'gender': [''],
      'neutered': [''],
      'breed': ['', [
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      'default': ['']
    });

    this.dogForm.valueChanges.subscribe(
      data => {
        this.onValueChanged(data)
      }
    );
  }

  // onValueChanged function taken from the Angular Cookbook's Form Validation section
  // https://angular.io/docs/ts/latest/cookbook/form-validation.html
  onValueChanged(data?: any) {
    if (!this.dogForm) { return; }
    const form = this.dogForm;

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
    'breed': ''
  }

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'maxlength': 'Name must be no longer than 25 characters.',
      'pattern': 'Name cannot contain special characters.'
    },
    'breed': {
      'maxlength': 'Breed must be no longer than 25 characters.',
      'pattern': 'Breed cannot contain special characters or numbers.'
    }
  }

  onDogFormSubmit() {
    if (this.dogForm.valid) {
      // form is valid
      const newDog = this.dogForm.value;

      // submit dog to database
      this.auth.addDog(newDog).subscribe(
        data => {
          if (data.success) {
            // show successful flash message
            this.flashMessage.show('Dog successfully added!', { cssClass: 'alert-success', timeout: 5000 });
            // redirect user to dashboard
            this.router.navigate(['/dashboard']);
          } else {
            // show failure flash message
            this.flashMessage.show(data.msg, { cssClass: 'alert-failure', timeout: 5000 });
            // redirect user to dashboard
            this.router.navigate(['/dashboard']);
          }
        },
        err => {
          console.log(err);
          return false;
        }
      );

    } else {
      // form is not valid
      console.log('Errors remain...');
    }
  }

  onCancelClick() {
    // redirect user to dashboard
    this.router.navigate(['/dashboard']);
  }

}
