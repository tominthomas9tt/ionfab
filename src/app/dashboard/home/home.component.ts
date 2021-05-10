import { Component, OnInit } from '@angular/core';

import 'capacitor-razorpay';
import { Plugins } from '@capacitor/core';
const { Checkout } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  async loadCheckout() {
    const options = {
      key: 'rzp_test_RKxwHbHve5eXEY',
      amount: '5000',
      order_id: 'order_H90ai4JDbB9qeU', //Obtained in response of Step 1.
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      name: 'Acme Corp',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
        name: 'Gaurav Kumar'
      },
      theme: {
        color: '#3399cc'
      }
    }
    try {
      let data = (await Checkout.open(options));
      console.log(data['response']['razorpay_payment_id'])
    } catch (error) {
      console.log(error['description'])
    }
  }
}
