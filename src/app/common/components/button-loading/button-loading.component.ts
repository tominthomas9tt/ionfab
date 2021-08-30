import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss'],
})
export class ButtonLoadingComponent implements OnInit {

  @Input() isLoading;
  @Input() label;
  buttonLabel = "";

  constructor() { }

  ngOnInit() {
    this.buttonLabel = this.label;
  }

}
