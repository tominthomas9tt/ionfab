

export class Inspection {

	public id?: number;

	public inspectionNo?: string;

	public tenderId?: number;

	public vendorId?: number;

	public date?: string;

	public description?: string;

	public createdAt?: string;

	public updatedAt?: string;

	public deletedAt?: string;

	public status?: number;

	public astatus?: number;


}

export class InspectionFilter {

	public id?: number;

	public inspectionNo?: string;

	public tenderId?: number;

	public vendorId?: number;

	public date?: string;

	public description?: string;

	public createdAt?: string;

	public updatedAt?: string;

	public deletedAt?: string;

	public status?: number;

	public astatus?: number;


	public offset?: number;

	public limit?: number;
}

