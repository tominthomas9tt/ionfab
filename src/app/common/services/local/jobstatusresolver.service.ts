import { Injectable } from '@angular/core';

class status {
  id?: number;
  message?: string;
  customerMessage?: string;
  vendorMessage?: string;
}

const STATUSES: status[] = [
  {
    id: 9,
    message: "Job initiated",
    customerMessage: "Job initiated",
    vendorMessage: "",
  },
  {
    id: 10,
    message: "Open for inspection",
    customerMessage: "Waiting for vendors for inspection. we will notifiy you once a vendor has opt this job for inspection.",
    vendorMessage: "Job open for inspection",
  },
  {
    id: 11,
    message: "Inspection in progress",
    customerMessage: "Waiting for inpection/report by vendor",
    vendorMessage: "",
  },
  {
    id: 12,
    message: "Open for connection",
    customerMessage: "Waiting for ready vendors",
    vendorMessage: "",
  },
  {
    id: 13,
    message: "Open for quotation",
    customerMessage: "Waiting for quotations from vendors",
    vendorMessage: "",
  },
  {
    id: 14,
    message: "Quotation accepted",
    customerMessage: "Pending workorder acceptance by vendor",
    vendorMessage: "",
  },
  {
    id: 15,
    message: "Work order generated",
    customerMessage: "Pending workorder acceptance by vendor",
    vendorMessage: "",
  },
  {
    id: 16,
    message: "Work order accepted",
    customerMessage: "Work order accepted / Work in progress",
    vendorMessage: "Work in progress",
  },
  {
    id: 17,
    message: "Work initiated",
    customerMessage: "Work order accepted / Work in progress",
    vendorMessage: "Work in progress",
  },
  {
    id: 18,
    message: "Work completed",
    customerMessage: "Work completed by the vendor.",
    vendorMessage: "Pending work completion acceptance by customer.",
  },
  {
    id: 19,
    message: "Work completion accepted",
    customerMessage: "Work completion accepted. Invoices are being prepared by the vendor. You will be notified once invoices are ready.",
    vendorMessage: "Work completion accepted by customer.",
  },
  {
    id: 21,
    message: "Invoice generate / waiting for payment",
    customerMessage: "Invoice has been generated, waiting for payment",
    vendorMessage: "Invoice has been sent to customer. Waiting for payment settlement.",
  },
  {
    id: 22,
    message: "Payment completed",
    customerMessage: "Job closed. Thank you.",
    vendorMessage: "Invoice has been sent to customer. Waiting for payment settlement.",
  },
  {
    id: 23,
    message: "Payment settled",
    customerMessage: "Job closed. Thank you.",
    vendorMessage: "Final settlement has been made to your account.",
  }
]

@Injectable({
  providedIn: 'root'
})
export class JobStatusService {

  constructor() {
  }

  resolve(statusId: number) {
    let status = STATUSES.filter(item => item.id == statusId)
    return status[0];
  }


}
