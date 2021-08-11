export class Services {
	public id?: number;
	public code?: string;
	public name?: string;
	public hasChildren?: string;
}

export class ServiceFilterParams {
	public code?: string;
	public name?: string;
	public info?: number;
	public parentServiceId?: number;
	public serviceCategoryId?: number;
	public status?: number;
	public offset?: number;
	public limit?: number;
}