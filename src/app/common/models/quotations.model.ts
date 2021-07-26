
export class Quotation {

	public id?: number;
			
	public quotationNo?: string;
			
	public tenderId?: number;
			
	public vendorId?: number;

	public vendorName?:string;
			
	public amount?: number;
			
	public scopeOfWork?: string;
			
	public isSuspected?: number;
			
	public isAccepted?: number;
			
	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;
			
	public status?: number;
			
	public astatus?: number;
			

}

export class QuotationFilter {
    
	public id?: number;
			
	public quotationNo?: string;
			
	public tenderId?: number;
			
	public vendorId?: number;
			
	public amount?: number;
			
	public scopeOfWork?: string;
			
	public isSuspected?: number;
			
	public isAccepted?: number;
			
	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;
			
	public status?: number;
			
	public astatus?: number;
			

    public offset?: number;

	public limit?: number;
}

