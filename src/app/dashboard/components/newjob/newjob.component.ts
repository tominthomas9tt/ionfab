import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { misDateFormatted } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.scss'],
})
export class NewjobComponent implements OnInit {
  @Input() tenderData;

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  dateFormatted(date) {
    return misDateFormatted(date, 'DD-MM-YYYY hh:mm A');
  }
  
  onDismiss(data = false) {
    this.popoverController.dismiss(data);
  }
}
