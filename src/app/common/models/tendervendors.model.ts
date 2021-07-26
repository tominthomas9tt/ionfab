
export class Tendervendor {

	public id?: number;
			
	public tenderId?: number;
			
	public vendorId?: number;

	public vendorName?:string;
			
	public isForInspection?: number;
			
	public isConnected?: number;
			
	public connectedAt?: string;
			
	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;
			
	public status?: number;
			
	public astatus?: number;
			

}

export class TendervendorFilter {
    
	public id?: number;
			
	public tenderId?: number;
			
	public vendorId?: number;
			
	public isForInspection?: number;
			
	public isConnected?: number;
			
	public connectedAt?: string;
			
	public createdAt?: string;
			
	public updatedAt?: string;
			
	public deletedAt?: string;
			
	public status?: number;
			
	public astatus?: number;
			
    public offset?: number;

	public limit?: number;
}

