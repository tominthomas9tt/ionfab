import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {

  @Input() registrationSteps;
  @Input() currentStage;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  dismiss(data = false) {
    this.modalController.dismiss(data);
  }
}
