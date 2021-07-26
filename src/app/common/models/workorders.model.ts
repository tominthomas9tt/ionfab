
export class Workorder {

	public id?: number;
			
	public workorderNo?: string;
			
	public tenderId?: number;
			
	public userId?: number;
			
	public vendorId?: number;
			
	public quotationId?: number;
			
	public date?: string;
			
	public amount?: number;

	public additionalAmount?:number;

	public additionalAmountRemarks?:string;

	public totalAmount?:number;

	public isSuspected?:number;
			
	public remarks?: string;
			
	public isCompleted?: number;
			
	public completedAt?: string;

	public isCompletedAccepted?: number;
			
	public completedAcceptedAt?: string;
			
	public isAccepted?: number;
			
	public acceptedAt?: string;
			
	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;
			
	public status?: number;
			
	public astatus?: number;
			

}

export class WorkorderFilter {
    
	public id?: number;
			
	public workorderNo?: string;
			
	public tenderId?: number;
			
	public userId?: number;
			
	public vendorId?: number;
			
	public quotationId?: number;
			
	public date?: string;
			
	public amount?: number;

	public additionalAmount?:number;

	public additionalAmountRemarks?:string;

	public totalAmount?:number;

	public isSuspected?:number;
			
	public remarks?: string;
			
	public isCompleted?: number;
			
	public completedAt?: string;

	public isCompletedAccepted?: number;
			
	public completedAcceptedAt?: string;
			
	public isAccepted?: number;
			
	public acceptedAt?: string;
			
	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;
			
	public status?: number;
			
	public astatus?: number;
			

    public offset?: number;

	public limit?: number;
}

