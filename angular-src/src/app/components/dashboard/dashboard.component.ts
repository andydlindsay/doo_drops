import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: Object;
  
  constructor(
    private auth: AuthService,
    private titleService: Title,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Dashboard - Doo Drops');
    this.auth.getUserProfile().subscribe(
      data => {
        this.user = data.user;
      }, 
      err => {
        console.log(err);
        return false;
      }
    );
  }

  onAddDogClick() {
    // navigate to user/adddog
    this.router.navigate(['/user/adddog']);
  }

  recordDoodrop(i) {
    // populate doodrop with dog information
    const newDoodrop = {
      "doo": true,
      "gender": this.user['dogs'][i].gender,
      "breed": this.user['dogs'][i].breed,
      "neutered": this.user['dogs'][i].neutered,
      "age": 0,
      "loc": {
        "lng": 0,
        "lat": 0
      }
    }
    // calculate dog's age in days
    newDoodrop.age = this.auth.dateDiffInDays(this.user['dogs'][i].dob, new Date());

    // subscribe solution by Gili Yaniv on StackOverflow
    // http://stackoverflow.com/questions/42721123/angular-2-wait-for-promise-before-continuing
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        newDoodrop.loc = {
          "lng": crd.longitude,
          "lat": crd.latitude
        }

        this.auth.addDoodrop(newDoodrop).subscribe(
          data => {
            if (data.success) {
              // show success message
              this.flashMessage.show('Doodrop recorded successfully.', { cssClass: 'alert-success' });
              // redirect user to dashboard
              this.router.navigate(['/dashboard']);
            } else {
              // show failure message
              this.flashMessage.show(data.errmsg, { cssClass: 'alert-failure' });
              // redirect user to dashboard
              this.router.navigate(['/dashboard']);
            }
          },
          err => {
            console.log(err);
            return false;
          }
        );

      },
      err => {
        console.warn('ERROR' + err.code + ': ' + err.message);
      }
    );

  }

}
