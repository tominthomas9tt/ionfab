import { Invoice } from "./invoice";

export class Tender{

	public id?: number;
			
	public tenderNo?: string;

	public title?: string;
			
	public userId?: number;
			
	public addressId?: number;

	public addressline1?: string;

	public addressline2?: string;

	public street?: string;

	public city?: string;

	public state?: string;

	public pin?: string;

	public landmark?: string;
			
	public date?: string;
			
	public serviceId?: number;

	public serviceCategoryId?: number;

	public jobDate?: string;

	public jobTime?: string;

	public isPaidForInspection?: number;

	public inspectionPaymentId?: number;

	public subServiceId?: number;

	public serviceName?:string;
			
	public description?: string;
			
	public isInspectionRequired?: number;
			
	public isVendorsReadyToInspect?: number;
			
	public isOpenToInspect?: number;
			
	public inspectionVendorId?: number;
			
	public inspectionReportId?: number;
			
	public isOpenToConnect?: number;
			
	public isOpenToQuote?: number;
			
	public isVendorsReadyToQuote?: number;
			
	public isQuotationsReceived?: number;
			
	public quotationId?: number;
			
	public workorderId?: number;
			
	public remarks?: string;
			
	public createdAt?: string;
			
	public createdBy?: number;
			
	public updatedAt?: string;
			
	public updatedBy?: number;
			
	public deletedAt?: string;
			
	public deletedBy?: number;
			
	public status?: number;

	public statusName?:string;
			
	public astatus?: number;

	public invoice?:Invoice;
			

}

export class TenderFilter {
    
	public id?: number;
			
	public tenderNo?: string;

	public title?: string;
			
	public userId?: number;
			
	public addressId?: number;
			
	public date?: string;

	public serviceCategoryId?: number;

	public jobDate?: string;

	public jobTime?: string;

	public isPaidForInspection?: number;

	public inspectionPaymentId?: number;

	public subServiceId?: number;
			
	public serviceId?: number;
			
	public description?: string;
			
	public isInspectionRequired?: number;
			
	public isVendorsReadyToInspect?: number;
			
	public isOpenToInspect?: number;
			
	public inspectionVendorId?: number;
			
	public inspectionReportId?: number;
			
	public isOpenToConnect?: number;
			
	public isOpenToQuote?: number;
			
	public isVendorsReadyToQuote?: number;
			
	public isQuotationsReceived?: number;
			
	public quotationId?: number;
			
	public workorderId?: number;
			
	public remarks?: string;
			
	public createdAt?: string;
			
	public createdBy?: number;
			
	public updatedAt?: string;
			
	public updatedBy?: number;
			
	public deletedAt?: string;
			
	public deletedBy?: number;
			
	public status?: number;
			
	public astatus?: number;
			
	public statusName?:string;

    public offset?: number;

	public limit?: number;
}

