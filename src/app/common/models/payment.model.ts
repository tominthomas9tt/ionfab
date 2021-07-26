export class Payment {

    public transactionId?: number;

    public no?: string;

    public type?: number;

    public referenceNo?: string;

    public amount?: string;

    public payStatus?: string;

    public payNature?: string;

    public payOrderNo?: string;

    public payReference?: string;

    public payRemarks?: string;

    public createdAt?: string;

    public createdBy?: number;

    public updatedAt?: string;

    public updatedBy?: number;

    public deletedAt?: string;

    public deletedBy?: number;

    public status?: number;

    public astatus?: number;


}

export class PayInitializer {
    public type: number;
    public name: string;
    public email: string;
    public mobile?: string;
    public amountPayable: number;
    public referenceNo: string;
    public remarks: string;
    public theme?: string
}

export class PayResponse {
    status: boolean;
    transactionId: number;
    remarks?: string;
}

export class PaymentResponse {
    public transactionId: number;
    public no: string;
    public type: number;
    public payOrderNo: string;
    public referenceNo: string;
    public amount: number;
    public payRemarks: string;
    public payStatus: number;
}


export class CreateOrder {
    public type?: number;
    public referenceNo?: string;
    public amount?: number;
    public payStatus?: string;
    public payNature?: string;
    public payRemarks?: string;
}

export class RzpSuccess {
    public razorpay_payment_id: string;
    public razorpay_order_id: string;
    public razorpay_signature: string;
}

export class PaymentSuccess {
    public transactionId: number;
    public paymentResponse: any;
}

export class PaymentFail {
    public transactionId: number;
    public paymentRemarks: string;
}
