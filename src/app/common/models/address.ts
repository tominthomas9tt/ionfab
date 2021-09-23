export class Address {
	public userId?: number;
	public addressId?: number;
	public addressline1?: string;
	public addressline2?: string;
	public street?: string;

	public municipalityId?: number;
	
	public city?: string;
	public state?: string;
	public pin?: string;
	public landmark?: string;
	public isPrimary?: string;
}


export class AddressFilter {

	public addressId?:number;

	public userId?: number;

	public addressline1?: string;

	public addressline2?: string;

	public street?: string;

	public municipalityId?: number;

	public city?: string;

	public state?: string;

	public pin?: number;

	public landmark?: string;

	public isPrimary?: number;

	public createdAt?: string;

	public createdBy?: string;

	public updatedAt?: string;

	public updatedBy?: string;

	public deletedAt?: string;

	public deletedBy?: string;

	public status?:number;

	public astatus?:number;

	public offset?:number;

	public limit?: number;

}
