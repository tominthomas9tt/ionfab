import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from '../common/services/local/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  pages = [{
    title: "Home",
    url: "/dashboard/home",
    icon: "home"
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: "person"

  },
  {
    title: "Business",
    url: "/dashboard/business",
    icon: "business"

  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: "build"
  }
  ];

  selectedPath = "";
  constructor(private router: Router,
    private authService: AuthService) {
    this.selectedPath = this.router.url;
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })

  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
  }


}
