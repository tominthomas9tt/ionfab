import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  notifications=0;
  
  constructor() { }

  ngOnInit() {
    console.log("notification intiated")
  }

  showNotifications() {

  }

}
