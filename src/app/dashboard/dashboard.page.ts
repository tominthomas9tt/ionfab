import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  pages = [{
    title: "Home",
    url: "/dashboard/home"
  },
  {
    title: "Profile",
    url: "/dashboard/profile"
  },
  {
    title: "Business",
    url: "/dashboard/business"
  },
  {
    title: "Services",
    url: "/dashboard/services"
  }
  ];

  selectedPath = "";
  constructor(private router: Router, private authService: AuthService) {
    this.selectedPath = this.router.url;
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })

  }

  ngOnInit() {
  }



}
