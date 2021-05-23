export class BusinessserviceRequest {
	public name?: string;
	public serviceId?: number;
	public businessId?: number;
	public serviceCategoryId?: number;
	public description?: string;
	public satus?: number;
}

export class BusinessserviceResponse {
	public businessServiceId?: number;
	public label?: string;
	public name?: string;
	public category?: string;
	public description?: string;
}

