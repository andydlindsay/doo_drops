import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  count: Number;

  constructor(
    private titleService: Title,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Home - Doo Drops');
    this.getCount();
  }

  getCount() {
    this.auth.getDoodropCount().subscribe(
      data => {
        this.count = data.count;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

}
