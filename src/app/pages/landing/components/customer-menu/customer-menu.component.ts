import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styleUrls: ['./customer-menu.component.scss'],
})
export class CustomerMenuComponent implements OnInit {

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  onDismiss() {
    this.popoverController.dismiss(false);
  }
}
