import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
})
export class BackComponent implements OnInit {

  @Input() title="";

  constructor(private _location: Location) { }

  ngOnInit() { }

  backClicked() {
    this._location.back();
  }
}
