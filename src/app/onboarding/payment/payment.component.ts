import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checkout } from 'capacitor-razorpay';
import { BusinessDetails } from 'src/app/common/models/business';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { CreateOrder, PaymentFail, PaymentResponse, PaymentSuccess } from 'src/app/common/models/payment.model';
import { User } from 'src/app/common/models/user';
import { PaymentService } from 'src/app/common/services/http/payment.service';
import { NotificationService } from 'src/app/common/services/notification.service';
import { StoredUserService } from 'src/app/common/services/storeduser.service';


const RZP_KEY = "rzp_test_RKxwHbHve5eXEY";


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  @Input() businessInData: BusinessDetails[];

  user: User;
  isPayBtnDisabled = false;

  amountPayable = 450;

  @Input() item;
  
  @Output() paymentSubmitEvent = new EventEmitter();

  constructor(
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private storedUserService: StoredUserService,
  ) { }

  ngOnInit() {
    this.storedUserService.getUser().then((data) => {
      this.user = data;
    })
  }

  async loadCheckout(transactionId: number, options) {
    try {
      let data = (await Checkout.open(options));
      if (data && data.response) {
        let successData: PaymentSuccess = {
          transactionId: transactionId,
          paymentResponse: data.response
        };
        this.paymentService.paymentSuccess(successData).subscribe((response: Httpresponse) => {
          if (response.status) {
            this.paymentSubmitEvent.emit([]);
          }
          this.notificationService.showNotification("Payment successfull.")
        })
      }
    } catch (error) {
      let failureData: PaymentFail = {
        transactionId: transactionId,
        paymentRemarks: error['description']
      };
      this.paymentService.paymentFailure(failureData).subscribe((response: Httpresponse) => {
        this.notificationService.showNotification("Payment Failed.Please try later.")
      })
    }
  }

  onPaymentComplete() {
    this.isPayBtnDisabled = true;
    const orderData: CreateOrder = {
      "type": 1,
      "referenceNo": this.user.userId.toString(),
      "amount": 450,
      "payRemarks": "Vendor registration fees."
    }

    this.paymentService.createOrder(orderData).subscribe((response: Httpresponse) => {
      if (response.status) {
        const orderResponseData: PaymentResponse = response.data[0];
        const options = {
          key: RZP_KEY,
          amount: orderResponseData.amount * 100,
          order_id: orderResponseData.payOrderNo,
          description: orderResponseData.payRemarks,
          // image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          name: 'Faby Serve',
          prefill: {
            email: this.user.userUsername,
            contact: this.businessInData[0]?.primaryMobile,
            name: this.user.userName
          },
          theme: {
            color: '#f96203'
          }
        }
        this.loadCheckout(orderResponseData.transactionId, options);
      } else {
        this.notificationService.showNotification("Payment Failed.Please try later.")
      }
      setTimeout(() => {
        this.isPayBtnDisabled = false;
      }, 5000);
    });

  }

}
