import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() rating;
  @Output() rateChanged = new EventEmitter();

  rate = 0;

  filledIcon = "star";
  halfIcon = "star-half";
  blankIcon = "star-outline";

  constructor() {
  }

  ngOnInit() {
    this.rate = this.rating ?? 0;
  }

  changeRate(newRate) {
    this.rate = newRate;
    this.rateChanged.emit(this.rate);
  }

}
