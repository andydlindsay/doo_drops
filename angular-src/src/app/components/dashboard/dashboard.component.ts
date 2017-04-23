import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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

}
