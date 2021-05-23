export class Services {
	public id?: number;
	public code?: string;
	public name?: string;
	public hasChildren?: string;
}

export class ServiceFilterParams {
	public parentServiceId?: number;
	public serviceCategoryId?: number;
}