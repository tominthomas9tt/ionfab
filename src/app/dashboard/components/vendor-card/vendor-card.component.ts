import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss'],
})
export class VendorCardComponent implements OnInit {

  @Input() item;

  image = "https://image.freepik.com/free-vector/woman-working-typing-sending-messages_74855-7941.jpg";
  constructor() { }

  ngOnInit() { }

  onClick(itemNo) {
    console.log(itemNo);
  }


}
