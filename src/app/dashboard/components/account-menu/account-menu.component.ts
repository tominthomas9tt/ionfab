import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/common/services/local/auth.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {


  constructor(private authService: AuthService,
    private popoverController: PopoverController) { }

  ngOnInit() { }

  signOut() {
    this.onDismiss();
    this.authService.signOut();
  }

  onDismiss(data = false) {
    this.popoverController.dismiss(data);
  }
}
