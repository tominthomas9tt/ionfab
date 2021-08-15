import { Injectable } from '@angular/core';
import { Checkout } from 'capacitor-razorpay';
import { Constants } from 'src/app/common/configs/index.config';
import { Httpresponse } from 'src/app/common/models/httpresponse.model';
import { CreateOrder, PayInitializer, PaymentFail, PaymentResponse, PaymentSuccess, PayResponse } from 'src/app/common/models/payment.model';
import { PaymentService } from 'src/app/common/services/http/payment.service';
import { NotificationService } from './notification.service';

const RZP_KEY = Constants.RAZORPAY.KEY;


@Injectable({
  providedIn: 'root'
})
export class LocalPaymentService {

  constructor(
    private paymentService: PaymentService,
    private notificationService: NotificationService
  ) {
  }

  async loadCheckout(transactionId: number, options, resolve, reject) {
    try {
      let data = (await Checkout.open(options));
      if (data && data.response) {
        let successData: PaymentSuccess = {
          transactionId: transactionId,
          paymentResponse: data.response
        };
        this.paymentService.paymentSuccess(successData).subscribe((response: Httpresponse) => {
          if (response.status) {
            resolve({
              transactionId: transactionId,
              status: true,
              remarks: ""
            });
          } else {
            reject({
              transactionId: transactionId,
              status: false,
              remarks: "Payment complete. Something went wrong."
            });
          }
        })
      } else {
        reject({
          transactionId: transactionId,
          status: false,
          remarks: "Payment complete. Something went wrong."
        });
      }
    } catch (error) {
      let failureData: PaymentFail = {
        transactionId: transactionId,
        paymentRemarks: error['description']
      };
      this.paymentService.paymentFailure(failureData).subscribe((response: Httpresponse) => {

      })
      reject({
        transactionId: transactionId,
        status: false,
        remarks: error['description'] ?? "Payment Failed.Please try later."
      });
    }
  }

  async init(paymentData: PayInitializer): Promise<PayResponse> {
    let promise = new Promise<PayResponse>((resolve, reject) => {
      const orderData: CreateOrder = {
        "type": paymentData?.type,
        "referenceNo": paymentData?.referenceNo,
        "amount": paymentData.amountPayable,
        "payRemarks": paymentData.remarks
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
              email: paymentData?.email,
              contact: paymentData?.mobile ?? null,
              name: paymentData?.name
            },
            theme: {
              color: paymentData?.theme ?? '#f96203'
            }
          }
          this.loadCheckout(orderResponseData.transactionId, options, resolve, reject);
        } else {
          this.notificationService.showNotification("Payment Failed.Please try later.")
          reject({
            status: false,
            remarks: "FAiled to create order"
          })
        }
      });
    });
    return promise;
  }


}