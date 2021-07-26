import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/common/models/user';
import { StoredUserService } from 'src/app/common/services/storeduser.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  user: User;

  constructor(
    private popoverController: PopoverController,
    private storedUserService: StoredUserService
  ) { }

  ngOnInit() {
    this.getStoredUser();
  }

  getStoredUser() {
    this.storedUserService.getUser().then((data) => {
      this.user = data
    })
  }

  onDismiss(data = false) {
    this.popoverController.dismiss(data);
  }


}
